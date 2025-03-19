import type { UserScrollI, userData } from "../types/UserData";

function UserScroll({ searchUser, users, setSelectUser }: UserScrollI) {
  return (
    <menu>
      <ul key={users.id}>
        {users
          .filter((val: userData) => {
            if (
              searchUser === "" ||
              val.pseudo.toLowerCase().includes(searchUser.toLowerCase())
            )
              return val;
          })
          .map((el: userData) => (
            <li key={el.id}>
              <button type="button" onClick={() => setSelectUser(el)}>
                {el.pseudo}
              </button>
            </li>
          ))}
      </ul>
    </menu>
  );
}

export default UserScroll;
