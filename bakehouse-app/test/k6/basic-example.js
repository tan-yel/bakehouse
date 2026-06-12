import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 2,
  duration: '30s',
};

export default function () {
  let res = http.get('https://tanyel-kemal-bakehouse.cta-training.academy/api/products');
  sleep(5);
}
