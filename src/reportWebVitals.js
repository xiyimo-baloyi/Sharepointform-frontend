// reportWebVitals.js
import { onCLS, onFID, onFCP, onLCP, onTTFB } from 'web-vitals';

// This is where the metrics will be logged or sent to your backend
const reportWebVitals = (metric) => {
  console.log(metric); // Log the metric to the console (or send to an analytics service)
};

// Hooking into the web vitals events
onCLS(reportWebVitals);
onFID(reportWebVitals);
onFCP(reportWebVitals);
onLCP(reportWebVitals);
onTTFB(reportWebVitals);

export default reportWebVitals;
