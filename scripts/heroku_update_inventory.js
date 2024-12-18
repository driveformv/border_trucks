const { fetchInventory } = require('./fetch_inventory');
const { sendNotification } = require('./emailNotifier');

// Add timestamp to logs for Heroku
const log = (message) => {
  console.log(`[${new Date().toISOString()}] ${message}`);
};

// Format the summary message
function formatSummary(stats) {
  return `
    <h2>Inventory Update Summary</h2>
    <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
    <p><strong>Total Vehicles Updated:</strong> ${stats.total}</p>
    <ul>
      <li>Trucks: ${stats.trucks}</li>
      <li>Trailers: ${stats.trailers}</li>
    </ul>
  `;
}

// Format error message
function formatError(error) {
  return `
    <h2>❌ Inventory Update Failed</h2>
    <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
    <p><strong>Error Message:</strong> ${error.message}</p>
    <p><strong>Stack Trace:</strong></p>
    <pre>${error.stack}</pre>
  `;
}

// Wrap the fetch inventory in error handling for Heroku
async function runInventoryUpdate() {
  try {
    log('Starting inventory update...');
    const stats = await fetchInventory();
    log('Inventory update completed successfully');
    
    // Send success notification
    await sendNotification(
      '✅ Border International Inventory Update Successful',
      formatSummary(stats)
    );
    
    process.exit(0);
  } catch (error) {
    log(`Error updating inventory: ${error.message}`);
    
    // Send error notification
    await sendNotification(
      '❌ Border International Inventory Update Failed',
      formatError(error)
    );
    
    process.exit(1);
  }
}

// Run the update
runInventoryUpdate();
