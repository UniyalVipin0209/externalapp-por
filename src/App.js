import "./App.css";
import InputForm from "./components/InputForm";
import Header from "./components/Common/Header";
import Footer from "./components/Common/Footer";

function App() {
  return (
    <div className="App">
      <Header></Header>
      <div className="container">
        <div className="row mt-3">
          <section style={{ width: "100%", height: "8vh" }}>
            <div className="col-8">
              <InputForm />
            </div>
          </section>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default App;
