import {BrowserRouter,Routes,Route} from "react-router-dom"
import Homepage from "./Pages/HomePage"
import AboutPage from "./Pages/AboutPage"
import ContactPage from "./Pages/ContactPage"
import BlogPage from "./Pages/Blogpage"
import CreateBlogPage from "./Pages/CreateBlogPage"
import SignupPage from "./Pages/SignupPage"
import LoginPage from "./Pages/LoginPage"
import AdminDashbordPage from"./Pages/AdminDashBordPage"
import SingleBlogPage from "./Pages/SingleBlogPage"
import AuthorProfilePage from "./Pages/AuthorProfilePage"
function App() {
  
  return (
    <>
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Homepage />} />
    <Route path="/about" element={<AboutPage />} />
    <Route path="/contact" element={<ContactPage />} />
    <Route path="/blog" element={<BlogPage />} />
    <Route path="/blog/:id" element={<SingleBlogPage />} />
    <Route path="/create" element={<CreateBlogPage />} />
    <Route path="/signup" element={<SignupPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/author/:id" element={<AuthorProfilePage />} />
    {/* <Route path="/admin/signup" element={<AdminSignupPage/>}/>
    <Route path="/admin/login" element={<AdminLoginPage/>}/> */}
    <Route path="/admin/dashboard" element={<AdminDashbordPage/>}/>
   


    </Routes>
    </BrowserRouter>
     
    </>
  )
}

export default App
