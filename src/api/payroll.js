import axios from 'axios';
import { delay } from '../utils/helper';

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const apiKey = import.meta.env.VITE_API_KEY;
const headers =  {
    'apikey': apiKey }



export const fetchPayrollTimeline = async () => {
// await delay(2000); // Simulate network delay
const res = await axios.get(`/api/payroll/timeline`, {
  headers: headers
  });
if(!res.data.error)
        return res.data.data;
else
        throw new Error(res.data.message);
};

export const fetchExpenseSummary = async () => {
// await delay(4000); // Simulate network delay
const res = await axios.get(`/api/expense`, {
  headers: headers
  });
if(!res.data.error)
        return res.data.data;
else
        throw new Error(res.data.message);
};