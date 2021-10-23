import { useEffect, useReducer, useState } from "react";
import { Link } from "react-router-dom";
import { deleteUser, fetchUsers } from "../ApiServices/Services";
import { User } from "../Data/User";
import { AppReducer } from "../ReactContext/AppReducer";
import { intialState } from "../ReactContext/Context";

export const DisplayPage = () => {
  const [state, dispatch] = useReducer(AppReducer, intialState);
  const [users, setUsers] = useState<Array<User>>([]);

  useEffect(() => {
    dispatch({
      type: "LOADING",
    });

    setTimeout(() => {
      fetchUsers().then((data) => {
        setUsers(data);
        dispatch({
          type: "LOADED",
        });
      });
    }, 1000);
  }, []);

  const handleDeleteBtnOnClick = (
    evt: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    indexOfUser: number
  ) => {
    evt.preventDefault();

    var userToDelete = users.find(
      (user: User, index: number) => index === indexOfUser
    );

    if (userToDelete !== null && userToDelete !== undefined) {
      setUsers(users.filter((user) => user.email !== userToDelete?.email));
      deleteUser(userToDelete);
    }
  };

  return (
    <div className="container">
      {state.isLoading === true ? (
        <div>loading...</div>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user, index) => {
                return (
                  <tr key={index}>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.email}</td>
                    <td>
                      <Link
                        className="btn btn-success"
                        to={`/updatePage/${user.email}`}
                      >
                        UPDATE
                      </Link>
                      <button
                        className="btn btn-danger ms-2"
                        onClick={(e) => handleDeleteBtnOnClick(e, index)}
                      >
                        DELETE
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      )}
    </div>
  );
};
