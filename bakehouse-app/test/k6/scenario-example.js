import http from 'k6/http';
import { group, check, sleep } from 'k6';

const BASE_URL = 'https://tanyel-kemal-bakehouse.cta-training.academy/';

export const options = {
    scenarios: {
        bounce: {
            exec: 'homeJourney',
            executor: 'ramping-vus',
            startVUs: 0,
            stages: [
                { duration: '30s', target: 5 },
                { duration: '30s', target: 5 },
            ],
            gracefulRampDown: '5s',
        },
        products: {
            exec: 'productsJourney',
            executor: 'ramping-vus',
            startVUs: 0,
            stages: [
                { duration: '30s', target: 1 },
                { duration: '30s', target: 1 },
            ],
            gracefulRampDown: '5s',
        },
        customers: {
            exec: 'customerJourney',
            executor: 'ramping-vus',
            startVUs: 0,
            stages: [
                { duration: '30s', target: 1 },
                { duration: '30s', target: 5 },
            ],
            gracefulRampDown: '5s',
        },
        newcustomer: {
            exec: 'newCustomerJourney',
            executor: 'ramping-vus',
            startVUs: 0,
            stages: [
                { duration: '30s', target: 5 },
                { duration: '40s', target: 5 },
            ],
            gracefulRampDown: '5s',
        },
        neworder: {
            exec: 'newOrderJourney',
            executor: 'ramping-vus',
            startVUs: 0,
            stages: [
                { duration: '30s', target: 5 },
                { duration: '40s', target: 5 },
            ],
            gracefulRampDown: '5s',
        },
        newproduct: {
            exec: 'newProductJourney',
            executor: 'ramping-vus',
            startVUs: 0,
            stages: [
                { duration: '30s', target: 5 },
                { duration: '40s', target: 5 },
            ],
            gracefulRampDown: '5s',
        },
    },
    thresholds: {
        http_req_duration: ['p(95)<250', 'max<2000'],
        http_req_failed: ['rate<0.1']
    },
};

export function homeJourney() {
    group('home journey', () => {
        simpleGetRequest(BASE_URL, '<div id="root"></div>');
        sleep(5);
    });
}

export function productsJourney() {
    group('products journey', () => {
        simpleGetRequest(BASE_URL);
        sleep(5);
        simpleGetRequest(`${BASE_URL}api/products`, 'victoria_sponge_slice');
        sleep(5);
    });
}

export function customerJourney() {
    group('customer journey', () => {
        simpleGetRequest(BASE_URL);
        sleep(5);
        simpleGetRequest(`${BASE_URL}api/customers`, 'Alice Baker');

        sleep(5);
    });
}

export function newCustomerJourney() {
    group('add new customer', () => {
        simpleGetRequest(BASE_URL);
        sleep(5);
        postNewCustomer(`${BASE_URL}api/customers/`,
            {
                name: 'Angel Cakeman', 
                email: 'cake@example.com'
            }
        )
        sleep(5)
    })
}

export function newOrderJourney() {
    group('add new order', () => {
        simpleGetRequest(BASE_URL);
        sleep(5);
        postNewOrder(`${BASE_URL}api/orders/`,
            {
                customerId: 1208, 
                items: [{
                    productId: 26,
                    quantity: 1
                }]
            }
        )
        sleep(5)
    })
}

export function newProductJourney() {
    group('add new product', () => {
        simpleGetRequest(BASE_URL);
        sleep(5);
        postNewProduct(`${BASE_URL}api/products`,
            {
                name: 'Rocky Road',
                category: 'Dessert',
                price: 6.99
            }
        )
        sleep(5)
    })
}

function simpleGetRequest(pageUrl, expectedText = null) {
    const res = http.get(pageUrl);
    sleep(1);
    const success = check(res, {
        'status was 200': (r) => r.status === 200,
        ...(expectedText && {
            'page contains expected text': (r) =>
                r.body.includes(expectedText),
        }),
    });

    if (!success) {
        console.log(`\nFAILED REQUEST: ${pageUrl}`);
        console.log(`Status: ${res.status}`);

        if (expectedText) {
            console.log(`Expected text: ${expectedText}`);
            console.log(`Response body: ${res.body.substring(0, 500)}`);
        }
    }
    return res;
}

function postNewCustomer(pageUrl, data) {
    const res = http.post(pageUrl, JSON.stringify(data), {
        headers: {'Content-Type': 'application/json'}
    })
    sleep(3)

    const success = check(res, {
        'status is 201': (r) => r.status === 201,
    });
    
    if (!success) {
        console.log(`\nFAILED REQUEST: ${pageUrl}`);
    }

    console.log(`Status: ${res.status}`);
    console.log(`Body: ${res.body}`);
}

function postNewOrder(pageUrl, data) {
    const res = http.post(pageUrl, JSON.stringify(data), {
        headers: {'Content-Type': 'application/json'}
    })
    sleep(3)

    const success = check(res, {
        'status is 201': (r) => r.status === 201,
    });
    
    if (!success) {
        console.log(`\nFAILED REQUEST: ${pageUrl}`);
    }
    
    console.log(`Status: ${res.status}`);
    console.log(`Body: ${res.body}`);
}

function postNewProduct(pageUrl, data) {
    const res = http.post(pageUrl, JSON.stringify(data), {
        headers: {'Content-Type': 'application/json'}
    })
    sleep(3)

    const success = check(res, {
        'status is 201': (r) => r.status === 201,
    });
    
    if (!success) {
        console.log(`\nFAILED REQUEST: ${pageUrl}`);
    }
    
    console.log(`Status: ${res.status}`);
    console.log(`Body: ${res.body}`);
}

