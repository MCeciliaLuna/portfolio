import { Result, Button } from "antd";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import "./NotFound.css";

const NotFound = () => {
  return (
    <div className="not-found-page">
      <SEO title="Página no encontrada | Cecilia Luna" description="La página que buscas no existe." url="/404" />
      <Result
        status="404"
        title="404"
        subTitle="¡Ups! La página que buscas no existe."
        extra={
          <Link to="/">
            <Button type="primary" size="large" className="back-home-button">
              Volver al inicio
            </Button>
          </Link>
        }
      />
    </div>
  );
};

export default NotFound;
