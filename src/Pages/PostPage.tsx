import { useState } from "react";
import { useHistory } from "react-router";
import { postUser } from "../ApiServices/Services";
import { User } from "../Data/User";

export const PostPage = () => {
  const history = useHistory();
  const [user, setUser] = useState<User>({
    firstName: "",
    lastName: "",
    email: "",
  });

  // Handle input on changes
  const handleInputsOnChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const name = evt.target.name;
    const value = evt.target.value;

    switch (name) {
      case "email":
        setUser({
          ...user,
          email: value,
        });
        return;
      case "fisrtName":
        setUser({
          ...user,
          firstName: value,
        });
        return;
      case "lastName":
        setUser({
          ...user,
          lastName: value,
        });
        return;
      default:
        break;
    }
  };

  // Handle submit button on click
  const handleSubmitBtnOnClick = (
    evt: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    evt.preventDefault();
    let regex = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
    if (!regex.test(user.email)) {
      alert("Email is invalid");
    } else if (user.firstName.length <= 0 || user.lastName.length <= 0) {
      alert("First name or last name cannot be empty");
    } else {
      postUser(user)
        .then((data) => history.push("/"))
        .catch((err) => console.log(err));
    }

    // Clear the data
    setUser({
      firstName: "",
      lastName: "",
      email: "",
    });
  };

  return (
    <div className="container">
      <form className="mt-5">
        <div className="form-group row my-2">
          <label className="col-sm-2 col-form-label">Email</label>
          <div className="col-sm-10">
            <input
              type="text"
              name="email"
              className="form-control"
              placeholder="Enter Email"
              value={user.email}
              onChange={(e) => handleInputsOnChange(e)}
            />
          </div>
        </div>
        <div className="form-group row my-2">
          <label className="col-sm-2 col-form-label">First Name</label>
          <div className="col-sm-10">
            <input
              type="text"
              name="fisrtName"
              className="form-control"
              placeholder="First Name"
              value={user.firstName}
              onChange={(e) => handleInputsOnChange(e)}
            />
          </div>
        </div>
        <div className="form-group row my-2">
          <label className="col-sm-2 col-form-label">Last Name</label>
          <div className="col-sm-10">
            <input
              type="text"
              name="lastName"
              className="form-control"
              placeholder="Last Name"
              value={user.lastName}
              onChange={(e) => handleInputsOnChange(e)}
            />
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={(e) => handleSubmitBtnOnClick(e)}
        >
          Submit
        </button>
      </form>
    </div>
  );
};
