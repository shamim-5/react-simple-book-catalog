import { Dropdown, Layout, Menu, Space } from "antd";
import { MenuFoldOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const { Header } = Layout;

const Navbar: React.FC = () => {
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  useEffect(() => {
    setSelectedKeys([location.pathname.replace(/^.*[/]/, "")]);
  }, [location]);

  const items = [
    { label: <Link to="/">Home</Link>, name: "Home", key: "0", path: `/` },
    { label: <Link to="/all-books">All-Books</Link>, name: "All-Books", key: "1", path: `/all-books` },
    { label: <Link to="/login">Login</Link>, name: "Login", key: "2", path: `/login` },
    { label: <Link to="/signup">Signup</Link>, name: "Signup", key: "3", path: `/signup` },
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
            <h2 className="text-2xl text-[#253858] font-mono  ml-2">
              <Link to={"/"}>RS-Book_Catalog</Link>
            </h2>
          </div>
        </div>

        <div>
          <div className="hidden lg:flex">
            <Menu
              className="text-[#253858] font-mono border-0"
              theme="light"
              mode="horizontal"
              selectedKeys={selectedKeys}
              items={items.map((m) => {
                const key = m.path.replace(/^.*[/]/, "");

                return {
                  key,
                  label: (
                    <Link className={`${selectedKeys[0] === m.path} && text-red-900`} to={m.path}>
                      {m.name}
                    </Link>
                  ),
                };
              })}
            />
          </div>

          <div className="flex lg:hidden">
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
