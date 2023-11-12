import Footer from "../../components/footer/main";
import Header from "../../components/header/main";

const Main = () => {
  return (
    <div className="h-full">
      <Header />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Address</th>
            <th>City</th>
            <th>State</th>
            <th>Zip Code</th>
            <th>Country</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>John Doe</td>
            <td>john.doe@example.com</td>
            <td>(123)456-7890</td>
            <td>123 Street Name</td>
            <td>Anytown</td>
            <td>CA</td>
            <td>90210</td>
            <td>USA</td>
          </tr>
          <tr>
            <td>Jane Smith</td>
            <td>jane.smith@example.com</td>
            <td>(123)456-7890</td>
            <td>123 Street Name</td>
            <td>Anytown</td>
            <td>CA</td>
            <td>90210</td>
            <td>USA</td>
          </tr>
          <tr>
            <td>Bob Johnson</td>
            <td>bob.johnson@example.com</td>
            <td>(123)456-7890</td>
            <td>123 Street Name</td>
            <td>Anytown</td>
            <td>CA</td>
            <td>90210</td>
            <td>USA</td>
          </tr>
        </tbody>
      </table>
      <Footer />
    </div>
  );
};

export default Main;
