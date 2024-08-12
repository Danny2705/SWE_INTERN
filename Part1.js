// Required Dependencies
const axios = require("axios");

// Monday.com API Details
const MONDAY_API_URL = "https://api.monday.com/v2";
const MONDAY_API_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjM5NjE0MjI2OSwiYWFpIjoxMSwidWlkIjo2NDYzMjM2MywiaWFkIjoiMjAyNC0wOC0xMlQxODo1MTo0NC4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MjQ4NzEzMDksInJnbiI6InVzZTEifQ.FxxUPORInYFw1oIxOZRoS20JHgU3oUzztl64xNZNbmk";

// GraphQL query to fetch data from the Monday.com board
const query = `query {
    boards (ids: 7210512653){
    items_page {
      items {
        id 
        name 
        column_values {
          id
          text
        }
      }
    }
  }
  }`;

const headers = {
  "Content-Type": "application/json",
  Authorization: MONDAY_API_KEY,
};

// Function to fetch data from Monday.com board
const fetchBoardData = async () => {
  try {
    const response = await axios.post(MONDAY_API_URL, { query }, { headers });
    console.log("Full Response:", response.data);

    if (response.data.errors) {
      console.error("GraphQL Errors:", response.data.errors);
      return;
    }

    const items = response.data.data.boards[0].items_page.items;

    // console.log("Items:", items[0]);
    // console.log("Columns:", items[1].column_values[5].id);

    items?.forEach((item) => {
      const name = item.name;
      const email = item.column_values.find(
        (column) => column.id === "email__1"
      );
      const emailContent = item.column_values.find(
        (column) => column.id === "text__1"
      );

      console.log(
        ` Name: ${name}, Email: ${email.text}, Email Content: ${emailContent.text}`
      );
    });
  } catch (error) {
    console.error("Error fetching board data:", error);
  }
};

// Fetch the board data
fetchBoardData();
