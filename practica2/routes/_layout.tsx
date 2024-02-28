import { PageProps } from "$fresh/server.ts";

const Layout = (props: PageProps) => {
  const Component = props.Component;
  return (
    <div class="container"><Component /></div>
  );
};

export default Layout;