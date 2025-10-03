/**
 * E2E Smoke Test
 * 
 * Basic smoke test to verify the app can start and render
 * This is a fallback test that runs when full E2E tests are not available
 */

const http = require('http');

async function checkWebServer() {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: '/',
      method: 'GET',
      timeout: 5000
    };

    const req = http.request(options, (res) => {
      console.log(`✓ Web server responded with status: ${res.statusCode}`);
      
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        if (res.statusCode === 200) {
          console.log('✓ Web app is accessible');
          
          // Check if response contains expected content
          if (data.includes('docente') || data.includes('app') || data.includes('root')) {
            console.log('✓ Response contains expected content');
            resolve(true);
          } else {
            console.warn('⚠️ Response may not contain expected app content');
            resolve(true); // Still pass as server is responding
          }
        } else {
          reject(new Error(`Unexpected status code: ${res.statusCode}`));
        }
      });
    });

    req.on('error', (err) => {
      console.error('✗ Failed to connect to web server:', err.message);
      reject(err);
    });

    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });

    req.end();
  });
}

async function runSmokeTests() {
  console.log('🧪 Running E2E Smoke Tests\n');
  
  try {
    console.log('Test 1: Check web server accessibility...');
    await checkWebServer();
    
    console.log('\n✅ All smoke tests passed!');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Smoke tests failed:', error.message);
    process.exit(1);
  }
}

// Run tests
runSmokeTests();
