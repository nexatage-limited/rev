import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Apple from "next-auth/providers/apple"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Apple({
      clientId: process.env.APPLE_CLIENT_ID,
      clientSecret: process.env.APPLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    async signIn({ user, account }) {
      // You can add custom logic here to save user to your backend
      return true
    },
    async redirect({ url, baseUrl }) {
      // Handle redirect after sign in
      if (url.startsWith("/")) return `${baseUrl}${url}`
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },
    async session({ session, token }) {
      // Add custom fields to session
      if (token.sub) {
        session.user.id = token.sub
      }
      return session
    },
  },
})

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validatePassword = (password: string): boolean => {
  if (password.length < 6) return false
  const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/
  return specialCharRegex.test(password)
}

export const validatePhone = (phone: string): boolean => {
  if (!phone.startsWith('+')) return false
  if (phone.length < 10) return false
  return true
}

export const validateName = (name: string): boolean => {
  return name.trim().length > 0
}

interface LoginCredentials {
  email: string
  password: string
  userType: 'user' | 'technician'
}

interface RegisterCredentials {
  email: string
  phone: string
  full_name: string
  password: string
  confirmPassword: string
  role: string
}

export const login = async (credentials: LoginCredentials) => {
  if (!validateEmail(credentials.email)) {
    throw new Error('Please enter a valid email address')
  }

  if (!validatePassword(credentials.password)) {
    throw new Error('Password must be at least 6 characters with one special character')
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002'}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  })

  if (!response.ok) {
    throw new Error('Login failed. Please check your credentials.')
  }

  return response.json()
}

export const register = async (credentials: RegisterCredentials) => {
  if (!validateName(credentials.full_name)) {
    throw new Error('Full name is required')
  }

  if (!validateEmail(credentials.email)) {
    throw new Error('Please enter a valid email address')
  }

  if (!validatePhone(credentials.phone)) {
    throw new Error('Phone number must start with + and be at least 10 characters')
  }

  if (!validatePassword(credentials.password)) {
    throw new Error('Password must be at least 6 characters with one special character')
  }

  if (credentials.password !== credentials.confirmPassword) {
    throw new Error('Passwords do not match')
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002'}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: credentials.email,
      phone: credentials.phone,
      full_name: credentials.full_name,
      password: credentials.password,
      role: credentials.role
    }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Registration failed')
  }

  return response.json()
}
