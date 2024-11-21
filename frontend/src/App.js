import React, { useState } from "react";
import { login, fetchMe, handleUserInput } from "./services/api";
import { Layout, Form, Input, Button, Typography, Alert, Card } from "antd";


const { Header, Content, Footer } = Layout;
const { Title } = Typography;

function App() {
  const [token, setToken] = useState("");
  const [user, setUser] = useState({username:"test"});
  const [error, setError] = useState("");

  const handleLogin = async (values) => {
    const { username, password } = values;

    try {
      const token = await login(username, password);
      setToken(token);
      const userData = await fetchMe(token);
      userData && setUser(userData);
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ backgroundColor: "#001529", padding: "0 20px" }}>
        <Title level={3} style={{ color: "#fff", margin: 0 }}>
          OWASP Security Example
        </Title>
      </Header>
      <Content style={{ padding: "20px" }}>
        <div style={{ maxWidth: "400px", margin: "0 auto", marginTop: "50px" }}>
          {!token ? (
            <Card title="Login" bordered={false}>
              <Form layout="vertical" onFinish={handleLogin} style={{ textAlign: "left" }}>
                <Form.Item label="Username" name="username" rules={[{ required: true, message: "Please enter your username!" }]}>
                  <Input placeholder="Enter your username" />
                </Form.Item>
                <Form.Item label="Password" name="password" rules={[{ required: true, message: "Please enter your password!" }]}>
                  <Input.Password placeholder="Enter your password" />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" block>
                    Login
                  </Button>
                </Form.Item>
              </Form>
              {error && <Alert message={error} type="error" showIcon />}
            </Card>
          ) : (
            <Card title={`Welcome, ${user?.username}`} bordered={false}>
              <Button
                type="primary"
                danger
                style={{ marginTop: "20px", marginRight: "20px" }}
                onClick={() => {
                  setToken("");
                  setUser(null);
                  setError("");
                }}
              >
                Logout
              </Button>
              <Button
                type="primary"
                danger
                style={{ marginTop: "20px" }}
                onClick={() => {
                  handleUserInput("<script>alert('XSS')</script>");
                }}
              >
                Test Xss
              </Button>
            </Card>
          )}
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>OWASP Security Example</Footer>
    </Layout>
  );
}

export default App;
