import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import DOMPurify from "dompurify";
import axios from "axios";

const API_URL = "http://localhost:4000";

// Apollo Client
const client = new ApolloClient({
  uri: `${API_URL}/graphql`,
  cache: new InMemoryCache(),
  headers: {
    "csrf-token": "" 
  }
});

// CSRF token
export const fetchCsrfToken = async () => {
  try {
    const response = await axios.get(`${API_URL}/form`, { withCredentials: true });
    return response.data.csrfToken;
  } catch (error) {
    throw new Error("CSRF token alınamadı.");
  }
};

// Login
export const login = async (username, password) => {
  const csrfToken = await fetchCsrfToken();

  try {
    const response = await axios.post(
      `${API_URL}/login`,
      { username, password },
      {
        headers: { "csrf-token": csrfToken },
        withCredentials: true, 
      }
    );
    return response.data.token; 
  } catch (error) {
    throw new Error(error.response?.data?.message || "Bilinmeyen bir hata oluştu.");
  }
};

// Apollo Client
export const fetchMe = async (token) => {
  const csrfToken = await fetchCsrfToken();

  try {
    const response = await client.query({
      query: gql`
        query {
          me {
            id
            username
          }
        }
      `,
      context: {
        headers: {
          "Authorization": `Bearer ${token}`,
          "csrf-token": csrfToken
        }
      }
    });
    return response.data.me;
  } catch (error) {
    throw new Error(error.message || "Kullanıcı verisi alınamadı.");
  }
};
// XSS

export const handleUserInput = async (userInput) => {
  const csrfToken = await fetchCsrfToken();
  
  try {
    // Sanitize the user input to prevent XSS
    const sanitizedInput = DOMPurify.sanitize(userInput);

    const response = await axios.post('http://localhost:4000/user-input', {
      input: sanitizedInput, // Sanitized Input 
    }, {
      headers: { "csrf-token": csrfToken },
      withCredentials: true,
    });

    alert(response.data);
    console.log('Sanitized Input:', response.data); // Sanitized Data
  } catch (error) {
    console.error('Error:', error);
    throw new Error(error);
  }
};

