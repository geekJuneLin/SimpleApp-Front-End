import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { fetchUserByEmail, updateUser } from "../ApiServices/Services";
import { User } from "../Data/User";

interface UserPramas {
  email: string;
}

export const UpdatePage = () => {
  // Hooks
  const history = useHistory();
  const params = useParams<UserPramas>();
  const [user, setUser] = useState<User>({
    email: "",
    firstName: "",
    lastName: "",
  });

  useEffect(() => {
    fetchUserByEmail(params.email)
      .then((data) => {
        setUser(data);
      })
      .catch((err) => console.log(err));
  }, [params]);

  const handleInputsOnChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const name = evt.target.name;

    switch (name) {
      case "email":
        setUser({
          ...user,
          email: evt.target.value,
        });
        return;
      case "fisrtName":
        setUser({
          ...user,
          firstName: evt.target.value,
        });
        return;
      case "lastName":
        setUser({
          ...user,
          lastName: evt.target.value,
        });
        return;
      default:
        break;
    }
  };

  const handleUpdateBtnOnClick = (
    evt: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    evt.preventDefault();
    updateUser(params.email, user)
      .then((data) => {
        history.push("/");
      })
      .catch((err) => {
        console.log("update failed");
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
              readOnly
              value={params.email}
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
              value={user.lastName}
              onChange={(e) => handleInputsOnChange(e)}
            />
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={(e) => handleUpdateBtnOnClick(e)}
        >
          Update
        </button>
        <Link to="/" className="btn btn-outline-primary ms-2">
          Back
        </Link>
      </form>
    </div>
  );
};
