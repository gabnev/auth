import React, { useRef, useState } from 'react'
import { Card, Button, Form, Alert } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useAuth } from "../Contexts/AuthContext"

const ForgotPassword = () => {

  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setMessage("")
      setError("")
      setLoading(true)
      await resetPassword(emailRef.current.value)
      setMessage("Check your inbox for instructions")
    } catch {
      setError("Failed to reset password")
    }

    setLoading(false);
  }

  return (
    <>
      <Card>
        <Card.Body>

          <h2 className="text-center mb-3">Reset Password</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}

          <Form>

            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                ref={emailRef}
                required
              />
            </Form.Group>

            <Button
              onClick={handleSubmit}
              disabled={loading}
              className="w-100"
            >
              Reset Password
            </Button>

          </Form>

          <div className="w-100 text-center mt-3">
            <Link to="/login">Log In</Link>
          </div>

        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        No account? <Link to="/signup">Sign Up</Link>
      </div>
    </>
  )
}

export default ForgotPassword