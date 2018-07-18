set C=%USERPROFILE%\Documents\GitHub
set D=%USERPROFILE%\Documents\GitHub\vmiis\your-company-business-portal\modules

xcopy %C%\wappsystem\sleepfix-management\modules\*.* %D%\sleepfix\*.* /S /D /Y
pause
