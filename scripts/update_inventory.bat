@echo off
cd /d "C:\Users\sanhe\OneDrive - MVT Services\Desktop\Border_Int"
echo Starting inventory update at %date% %time% >> logs\inventory_update.log
node scripts/fetch_inventory.js >> logs\inventory_update.log 2>&1
echo Finished at %date% %time% >> logs\inventory_update.log
echo ---------------------------------------- >> logs\inventory_update.log
