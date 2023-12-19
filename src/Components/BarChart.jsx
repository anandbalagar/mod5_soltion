import React, { useEffect, useRef, useState } from 'react';

const BarChart = () => {
  const chartRef = useRef(null);
  const [data, setData] = useState(null);
  const [entityNames, setEntityNames] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await fetch('https://chartonlineapi.azurewebsites.net/api/Common');

      console.log('Response status:', response.status);

      if (!response.ok) {
        console.error('Response error:', response.statusText);
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      setData(result);

      // Extract unique entity names
      const uniqueEntityNames = [...new Set(result.map(item => item.entityName))];
      setEntityNames(uniqueEntityNames);

      setLoading(false);

      // Log the data to the console
      console.log('Fetched data:', result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    // Function to load Chart.js script dynamically
    const loadChartJsScript = () => {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
      script.async = true;
      document.head.appendChild(script);

      script.onload = () => {
        fetchData();
      };
    };

    // Check if Chart.js is already available
    if (typeof window.Chart === 'undefined') {
      // If not available, load the script dynamically
      loadChartJsScript();
    } else {
      // If already available, directly call the fetchData function
      fetchData();
    }
  }, []); // The empty dependency array means this effect will run once when the component mounts

  useEffect(() => {
    if (chartRef.current && data && entityNames.length > 0) {
      // Destroy the existing chart if it exists
      if (window.myChart) {
        window.myChart.destroy();
      }

      const ctx = chartRef.current.getContext('2d');

      const entityCounts = entityNames.map(entityName =>
        data.filter(item => item.entityName === entityName).length
      );

      window.myChart = new window.Chart(ctx, {
        type: 'bar',
        data: {
          labels: entityNames,
          datasets: [
            {
              label: 'Number of Features',
              data: entityCounts,
              backgroundColor: 'rgba(75,192,192,0.6)',
              borderColor: 'rgba(75,192,192,1)',
              borderWidth: 2,
            },
          ],
        },
        options: {
          scales: {
            x: {
              type: 'category',
            },
            y: {
              beginAtZero: true,
            },
          },
          responsive: true,
        },
      });
    }
  }, [data, entityNames]);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : data && entityNames.length > 0 ? (
        <div>
         <h1 style={{marginLeft:'20px'}}>All Entities</h1>
          <canvas ref={chartRef}   style={{ maxWidth: '80%',marginLeft: '140px',marginTop:'120px',height :'100px',width:'100px' }}></canvas>
        </div>
      ) : (
        <p>There are no entities available.</p>
      )}
    </div>
  );
};

export default BarChart;
