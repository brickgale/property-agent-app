import app from './app.js'

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`)
  console.log(`📋 Health check available at http://localhost:${PORT}/health`)
  console.log(`🔧 API endpoints available at http://localhost:${PORT}/api`)
  console.log(`📚 API Documentation available at http://localhost:${PORT}/api-docs`)
})
