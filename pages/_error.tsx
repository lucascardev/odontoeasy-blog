import { NextPageContext } from "next";

const Error = ({ statusCode }) => {
  return (
    <div className='justify-center md:flex bg-gray-100 rounded-xl p-8 md:p-0'> 
    <div className="pt-6 md:p-8 text-center md:text-left space-y-4">
    <p className="text-lg font-semibold" >
    {statusCode
      ? `An error ${statusCode} occurred on server`
      : "An error occurred on client"}
  </p>
  <figcaption className="font-medium">
  <div className="text-cyan-600">
   {statusCode === 403 && `Error with your login`}
  </div>
  </figcaption>
  </div>
  </div>
  );
};

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;