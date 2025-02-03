"use client";

import { Layout, Button } from "antd";
import Image from "next/image";
import { GithubOutlined } from "@ant-design/icons";
import Logo from "../../public/logo.svg";

export const NavHeader: React.FunctionComponent = () => {
  return (
    <Layout.Header className="fixed top-0 left-0 w-full px-4 py-2 flex items-center h-14 z-50 bg-white border-b border-gray-200">
      <div className="flex items-center">
        <Image src={Logo} alt="Logo" width={50} height={50} />
        <h1 className="text-2xl font-bold ml-1">Superheroes</h1>
      </div>
      <div className="ml-auto flex items-center gap-2">
        <Button
          type="primary"
          icon={<GithubOutlined />}
          onClick={() => {
            const newTab = window.open(
              "https://github.com/sankarseran/superheroWeb",
              "_blank"
            );
            if (newTab) {
              newTab.opener = null; // Ensures no access to the parent page
            }
          }}
          className="flex items-center gap-1.5 bg-gray-800 !hover:bg-gray-800"
        >
          Web
        </Button>
        <Button
          type="primary"
          icon={<GithubOutlined />}
          onClick={() => {
            const newTab = window.open(
              "https://github.com/sankarseran/superheroAPI",
              "_blank"
            );
            if (newTab) {
              newTab.opener = null; // Ensures no access to the parent page
            }
          }}
          className="flex items-center gap-1.5 bg-gray-900 !hover:bg-gray-800"
        >
          API
        </Button>
      </div>
    </Layout.Header>
  );
};
