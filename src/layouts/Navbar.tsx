import { Button, Dropdown, Layout, Menu, Space } from "antd";
import { MenuFoldOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAppDispatch } from "@/redux/hooks/hook";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { userLoggedOut } from "@/redux/features/auth/authSlice";
import useAuth from "@/redux/hooks/useAuth";
import SearchAntd from "@/components/ui/SearchAntd";

const { Header } = Layout;

const Navbar: React.FC = () => {
  const isLoggedIn = useAuth();
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  useEffect(() => {
    setSelectedKeys([location.pathname.replace(/^.*[/]/, "")]);
  }, [location]);

  const dispatch = useAppDispatch();

  const handleSignOut = () => {
    signOut(auth);

    try {
      localStorage.clear();
      dispatch(userLoggedOut());
    } catch (err) {
      // do nothing
    }
  };

  const items = [
    { label: <Link to="/">Home</Link>, name: "Home", key: "0", path: `/` },
    { label: <Link to="/all-books">All-Books</Link>, name: "All-Books", key: "1", path: `/all-books` },
    { label: <Link to="/add-new-book">Add-New-Book</Link>, name: "add-new-book", key: "4", path: `/add-new-book` },

    {
      label: isLoggedIn ? (
        <Button onClick={() => handleSignOut()} className="text-[#253858] border-0 mx-0 px-0">
          Logout
        </Button>
      ) : (
        <Link to="/login">Login</Link>
      ),
      name: isLoggedIn ? "Logout" : "Login",
      key: "2",
      path: isLoggedIn ? "" : `/login`,
    },
    {
      label: !isLoggedIn && <Link to="/signup">Signup</Link>,
      name: !isLoggedIn && "Signup",
      key: "3",
      path: !isLoggedIn && `/signup`,
    },
  ];

  return (
    <>
      <Header className="flex items-center justify-between bg-[#FFFFFF] border-b border-b-slate-300/70 top-0 sticky z-40">
        <div className="flex items-center justify-between lg:mr-2">
          <div>
            <Link className="flex" to={"/"}>
              <img src="https://img.icons8.com/cotton/64/knowledge--v1.png" alt="logo" width={32} height={32} />
            </Link>
          </div>
          <div>
            <h2 className="text-xl lg:text-2xl text-[#253858] font-mono  ml-2">
              <Link to={"/"}>RS_Book-Catalog</Link>
            </h2>
          </div>
        </div>

        <div className="flex items-center justify-start">
          <div className="hidden lg:block">
            <Menu
              style={{ whiteSpace: "nowrap", minWidth: "500px" }}
              className="text-[#253858] font-mono border-0"
              theme="light"
              mode="horizontal"
              selectedKeys={selectedKeys}
              items={items.map((m) => {
                const key = m.key;
                // const key = m.path.replace(/^.*[/]/, "");

                return {
                  key,
                  label: m.path ? (
                    <Link className={`${selectedKeys[0] === m.path} && text-[#253858]`} to={m.path}>
                      {m.name}
                    </Link>
                  ) : (
                    <Button
                      onClick={() => handleSignOut()}
                      className={`${selectedKeys[0] === m.path} && text-[#253858] border-0 mx-0 px-0`}
                    >
                      {m.name}
                    </Button>
                  ),
                };
              })}
            />
          </div>
          <div className="mt-9 mr-2">
            <SearchAntd />
          </div>
          <div className="block lg:hidden">
            <Dropdown
              menu={{
                items,
              }}
              trigger={["click"]}
            >
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  <MenuFoldOutlined />
                </Space>
              </a>
            </Dropdown>
          </div>
        </div>
      </Header>
    </>
  );
};

export default Navbar;
