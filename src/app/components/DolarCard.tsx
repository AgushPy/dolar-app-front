import { Card, CardContent, Typography, CardActions, Button, Grid, Grid2 } from "@mui/material";
import Link from "next/link";
import { Dolar } from '../page';

interface DolarCardProps {
  dolar: Dolar
}

export const DolarCard = ({dolar} : DolarCardProps) => {
  return (
      
          <Card
            sx={{
              maxWidth: 350,
              mx: "auto",
              p: 2,
              boxShadow: 4,
              borderRadius: 3,
              transition: "transform 0.3s",
              "&:hover": { transform: "scale(1.05)" },
            }}
          >
            <CardContent>
              <Typography gutterBottom sx={{ color: "text.secondary", fontSize: 16 }}>
                Dólar Blue
              </Typography>
              <Typography variant="h5" component="div">
                💵 Compra: <strong>{dolar?.buyPrice}</strong>
              </Typography>
              <Typography variant="h5" component="div">
                💰 Venta: <strong>{dolar?.sellPrice}</strong>
              </Typography>
              <Typography sx={{ color: "text.secondary", mb: 1.5 }}>Variación</Typography>
              <Typography variant="body2" sx={{ fontWeight: "bold", color: dolar?.variation ? "green" : "red" }}>
                {dolar.variation}
              </Typography>
            </CardContent>
            <CardActions>
              <Link href={dolar?.source} passHref>
                <Button size="small" variant="text" color="primary">
                  Fuente
                </Button>
              </Link>
            </CardActions>
          </Card>
      )
}
