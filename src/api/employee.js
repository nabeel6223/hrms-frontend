import axios from 'axios';
import { delay } from '../utils/helper';

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const apiKey = import.meta.env.VITE_API_KEY;
const headers =  {
    'apikey': apiKey }


export const fetchEmployeeStats = async () => {
// await delay(2000); // Simulate network delay
const res = await axios.get(`${baseUrl}/employees/summary`, {
  headers: headers
  });
if(!res.data.error)
        return res.data.data;
else
        throw new Error(res.data.message);
};

export const fetchEmployeeLeaves = async () => {
// await delay(2000); // Simulate network delay
const res = await axios.get(`${baseUrl}/employees/leaves`, {
  headers: headers
  });
if(!res.data.error)
        return res.data.data;
else
        throw new Error(res.data.message);
};

export const fetchEmployeeBirthday = async () => {
// await delay(2000); // Simulate network delay
const res = await axios.get(`${baseUrl}/employees/birthdays`, {
  headers: headers
  });
if(!res.data.error)
        return res.data.data;
else
        throw new Error(res.data.message);
};
// export const fetchLeaveStats = async () => {
// const res = await fetch('/api/leaves/stats');
// return res.json();
// };

export const fetchEmployeeRequests = async () => {
// await delay(2000); // Simulate network delay
const res = await axios.get(`${baseUrl}/employees/requests`, {
  headers: headers
  });
if(!res.data.error)
        return res.data.data;
else
        throw new Error(res.data.message);
};
