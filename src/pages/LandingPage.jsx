import { useNavigate } from "react-router-dom";

export default function LandingPage() {

    const navigate = useNavigate()
  return (
    <div className="font-sans text-gray-700 bg-gray-50">

      {/* Glass Navbar */}
      <nav className="fixed w-full backdrop-blur-md bg-white/70 border-b z-50">
        <div className=" max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center p-4">
          <h1 className="text-xl font-bold text-indigo-600">
            BrightFuture
          </h1>

          <div className="flex text-sm md:text-base md:flex gap-3 md:gap-8 items-center">
            <a href="#" className="hover:text-indigo-600">Home</a>
            <a href="#" className="hover:text-indigo-600">About</a>
            <a href="#" className="hover:text-indigo-600">Programs</a>
            <a href="#" className="hover:text-indigo-600">Campus</a>
            <a href="#" className="hover:text-indigo-600">Contact</a>
            <button className="bg-indigo-600 text-white px-5 py-2 rounded-xl shadow hover:bg-indigo-700 transition"
            onClick={()=>navigate("/login")}>
              Login
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-28 pb-16 bg-gradient-to-br from-indigo-600 via-blue-500 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center px-6">

          <div>
            <h2 className="text-5xl font-bold mb-6 leading-tight">
              Building Future Leaders Through Quality Education
            </h2>
            <p className="text-lg mb-8 text-indigo-100">
              Modern classrooms, experienced teachers, and a safe learning
              environment to help students achieve excellence.
            </p>

            <div className="flex gap-4">
              <button className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-semibold shadow-lg hover:scale-105 transition">
                Enroll Now
              </button>
              <button className="border border-white px-6 py-3 rounded-xl hover:bg-white hover:text-indigo-600 transition">
                Virtual Tour
              </button>
            </div>

            {/* Hero Stats */}
            <div className="grid grid-cols-3 gap-6 mt-10">
              {[
                ["1200+", "Students"],
                ["60+", "Teachers"],
                ["25+", "Years"],
              ].map(([num, label], i) => (
                <div key={i}>
                  <h3 className="text-2xl font-bold">{num}</h3>
                  <p className="text-sm text-indigo-200">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <img
            src="https://images.unsplash.com/photo-1588072432836-e10032774350"
            className="rounded-2xl shadow-2xl"
            alt="School"
          />
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="max-w-7xl mx-auto py-16 px-6">
        <h3 className="text-3xl font-bold text-center mb-12">
          Why Choose BrightFuture
        </h3>

        <div className="grid md:grid-cols-4 gap-8">
          {[
            ["Smart Classrooms", "Digital learning environment"],
            ["Expert Teachers", "Highly qualified faculty"],
            ["Safe Campus", "24/7 security & monitoring"],
            ["Activities", "Sports, arts & clubs"],
          ].map(([title, desc], i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-2xl shadow hover:shadow-xl hover:-translate-y-2 transition"
            >
              <div className="text-3xl mb-3">🎓</div>
              <h4 className="font-semibold mb-1">{title}</h4>
              <p className="text-sm text-gray-500">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Programs */}
      <section className="bg-gray-100 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">
            Academic Programs
          </h3>

          <div className="grid md:grid-cols-3 gap-8">
            {["Primary", "Secondary", "Higher Secondary"].map((p, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow overflow-hidden hover:shadow-2xl transition"
              >
                <img
                  src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b"
                  className="h-44 w-full object-cover"
                  alt=""
                />
                <div className="p-6">
                  <h4 className="font-semibold text-lg mb-2">{p}</h4>
                  <p className="text-sm text-gray-500">
                    Comprehensive curriculum designed for academic and personal growth.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Campus Gallery */}
      <section className="max-w-7xl mx-auto py-16 px-6">
        <h3 className="text-3xl font-bold text-center mb-12">
          Campus Life
        </h3>

        <div className="grid md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <img
              key={i}
              src={`https://source.unsplash.com/400x300/?school,students&sig=${i}`}
              className="rounded-xl shadow hover:scale-105 transition"
              alt=""
            />
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-indigo-600 text-white py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-10">
            What Parents Say
          </h3>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              "Excellent teachers and great learning environment.",
              "My child’s confidence and performance improved a lot.",
            ].map((text, i) => (
              <div
                key={i}
                className="bg-white/10 backdrop-blur p-6 rounded-2xl"
              >
                <p className="text-indigo-100">“{text}”</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-center py-16">
        <h3 className="text-3xl font-bold mb-4">
          Admissions Open for 2026
        </h3>
        <p className="mb-6 text-indigo-100">
          Limited seats available. Start your child’s journey today.
        </p>
        <button className="bg-white text-indigo-600 px-8 py-3 rounded-xl font-semibold shadow-lg hover:scale-105 transition">
          Apply Today
        </button>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-10 text-center">
        <h4 className="text-white font-semibold mb-2">
          BrightFuture School
        </h4>
        <p>Email: info@brightfuture.com | +91 98765 43210</p>
        <p className="text-sm mt-4">
          © 2026 BrightFuture School. All rights reserved.
        </p>
      </footer>

    </div>
  );
}