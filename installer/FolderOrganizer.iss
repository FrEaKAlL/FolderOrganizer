; Folder Organizer installer. Paths are relative to this script's directory.

#ifndef MyAppVersion
  #define MyAppVersion "0.0.0"
#endif

#define MyAppId "{{4F8A621A-8F5D-4E8A-93E8-F2F8405A1138}"
#define CurrentServiceName "folderorganizer.exe"
#define LegacyServiceName "FolderOrganizer"
#define ConfigDirectory "{commonappdata}\FolderOrganizer"

[Setup]
AppId={#MyAppId}
AppName=Folder Organizer
AppVersion={#MyAppVersion}
AppPublisher=FrEaKAlL
DefaultDirName={commonpf}\FolderOrganizer
DefaultGroupName=FolderOrganizer
OutputDir=..\dist\FolderOrganizer-Installer
OutputBaseFilename=FolderOrganizer_Installer
Compression=lzma
SolidCompression=yes
SetupIconFile=..\assets\icon.ico
PrivilegesRequired=admin
PrivilegesRequiredOverridesAllowed=dialog
CloseApplications=yes
RestartApplications=no

[Dirs]
Name: "{#ConfigDirectory}"; Permissions: users-modify

[Files]
Source: "..\dist\FolderOrganizer-build\*"; DestDir: "{app}"; Excludes: "config.json"; Flags: recursesubdirs createallsubdirs ignoreversion

[InstallDelete]
Type: files; Name: "{app}\start.exe"
Type: files; Name: "{app}\package-lock.json"
Type: filesandordirs; Name: "{app}\process\daemon"

[Icons]
Name: "{group}\FolderOrganizer"; Filename: "{app}\folderorganizer.cmd"; WorkingDir: "{app}"; IconFilename: "{app}\assets\icon.ico"
Name: "{commondesktop}\FolderOrganizer"; Filename: "{app}\folderorganizer.cmd"; WorkingDir: "{app}"; IconFilename: "{app}\assets\icon.ico"

[UninstallRun]
Filename: "{cmd}"; Parameters: "/d /c node ""{app}\index.js"" --remove-service"; Flags: runhidden waituntilterminated skipifdoesntexist; RunOnceId: "RemoveFolderOrganizerService"

[UninstallDelete]
Type: filesandordirs; Name: "{app}\process\daemon"

[Code]

function InitializeSetup(): Boolean;
var
  ResultCode: Integer;
begin
  Result := Exec(ExpandConstant('{cmd}'), '/d /c node --version', '', SW_HIDE, ewWaitUntilTerminated, ResultCode) and (ResultCode = 0);
  if not Result then
    MsgBox(
      'Folder Organizer requires Node.js 22 or newer. Install Node.js before running this installer.',
      mbError,
      MB_OK
    );
end;

function ServiceExistsByName(const ServiceName: String): Boolean;
var
  ResultCode: Integer;
begin
  Result := Exec(
    ExpandConstant('{sys}\sc.exe'),
    'query "' + ServiceName + '"',
    '',
    SW_HIDE,
    ewWaitUntilTerminated,
    ResultCode
  ) and (ResultCode = 0);
end;

function ServiceExists(): Boolean;
begin
  Result := ServiceExistsByName('{#CurrentServiceName}') or ServiceExistsByName('{#LegacyServiceName}');
end;

procedure StopAndDeleteServiceByName(const ServiceName: String);
var
  ResultCode: Integer;
  Attempts: Integer;
begin
  if not ServiceExistsByName(ServiceName) then Exit;
  Exec(ExpandConstant('{sys}\sc.exe'), 'stop "' + ServiceName + '"', '', SW_HIDE, ewWaitUntilTerminated, ResultCode);
  for Attempts := 1 to 20 do
  begin
    if not ServiceExistsByName(ServiceName) then Break;
    Sleep(250);
  end;
  Exec(ExpandConstant('{sys}\sc.exe'), 'delete "' + ServiceName + '"', '', SW_HIDE, ewWaitUntilTerminated, ResultCode);
  for Attempts := 1 to 40 do
  begin
    if not ServiceExistsByName(ServiceName) then Break;
    Sleep(250);
  end;
end;

procedure StopAndDeleteExistingServices();
begin
  StopAndDeleteServiceByName('{#CurrentServiceName}');
  StopAndDeleteServiceByName('{#LegacyServiceName}');
end;

procedure RemoveLegacyUninstaller();
var
  LegacyUninstaller: String;
begin
  LegacyUninstaller := ExpandConstant('{app}\unins000.exe');
  if FileExists(LegacyUninstaller) and FileExists(ExpandConstant('{app}\unins001.exe')) then
  begin
    RegDeleteKeyIncludingSubkeys(HKEY_LOCAL_MACHINE, 'Software\Microsoft\Windows\CurrentVersion\Uninstall\Folder Organizer_is1');
    RegDeleteKeyIncludingSubkeys(HKEY_CURRENT_USER, 'Software\Microsoft\Windows\CurrentVersion\Uninstall\Folder Organizer_is1');
    DeleteFile(ExpandConstant('{app}\unins000.dat'));
    DeleteFile(LegacyUninstaller);
  end;
end;

procedure PrepareConfiguration();
var
  LegacyConfigPath: String;
  ConfigPath: String;
begin
  LegacyConfigPath := ExpandConstant('{app}\config.json');
  ConfigPath := ExpandConstant('{#ConfigDirectory}\config.json');
  ForceDirectories(ExpandConstant('{#ConfigDirectory}'));
  if (not FileExists(ConfigPath)) and FileExists(LegacyConfigPath) then
  begin
    if CopyFile(LegacyConfigPath, ConfigPath, False) then
    begin
      Log('Migrated FolderOrganizer configuration to ProgramData.');
      DeleteFile(LegacyConfigPath);
    end
    else
      Log('WARNING: Could not migrate legacy FolderOrganizer configuration.');
  end;
end;

function InstallWindowsService(): Boolean;
var
  ResultCode: Integer;
  NodeExe: String;
  Parameters: String;
begin
  Result := False;
  NodeExe := 'node.exe';
  Parameters := '"' + ExpandConstant('{app}\index.js') + '" --install-service';
  Log('Installing FolderOrganizer Windows service.');
  Log('Service command executable: ' + NodeExe);
  Log('Service command arguments: ' + Parameters);
  Log('Service command working directory: ' + ExpandConstant('{app}'));
  if not Exec(NodeExe, Parameters, ExpandConstant('{app}'), SW_HIDE, ewWaitUntilTerminated, ResultCode) then
  begin
    Log('Could not execute the FolderOrganizer service command.');
    Exit;
  end;
  Log(Format('Service command exit code: %d', [ResultCode]));
  if ResultCode <> 0 then Exit;
  Result := ServiceExistsByName('{#CurrentServiceName}');
  if Result then Log('Service verification result: True') else Log('Service verification result: False');
end;

procedure CurStepChanged(CurStep: TSetupStep);
begin
  if CurStep = ssInstall then
  begin
    if ServiceExists() then StopAndDeleteExistingServices();
  end
  else if CurStep = ssPostInstall then
  begin
    PrepareConfiguration();
    if FileExists(ExpandConstant('{#ConfigDirectory}\config.json')) then
    begin
      if not InstallWindowsService() then
      begin
        MsgBox(
          'Folder Organizer was installed, but the Windows service could not be created.' + #13#10 + #13#10 +
          'Review the Setup log for the service command exit code and verification result.',
          mbError,
          MB_OK
        );
        Exit;
      end;
    end
    else
      Log('Clean installation detected. Service creation deferred until initial configuration is saved.');
    RemoveLegacyUninstaller();
  end;
end;
