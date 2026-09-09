; Folder Organizer installer. Paths are relative to this script's directory.

#ifndef MyAppVersion
  #define MyAppVersion "0.0.0"
#endif

[Setup]
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

[Files]
Source: "..\dist\FolderOrganizer-build\*"; DestDir: "{app}"; Flags: recursesubdirs createallsubdirs

[Icons]
Name: "{group}\FolderOrganizer"; Filename: "{app}\start.exe"
Name: "{commondesktop}\FolderOrganizer"; Filename: "{app}\start.exe"

[UninstallDelete]
Type: filesandordirs; Name: "{app}"
