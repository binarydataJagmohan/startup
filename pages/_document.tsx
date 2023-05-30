import { useState, useEffect } from 'react';
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
 
  return (
    <Html lang="en">
      <Head>
        <title>Startup - IT Startups & Digital Services </title>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        {/* <!-- Bootstrap CSS -->  */}
        <link rel="stylesheet" href={process.env.NEXT_PUBLIC_BASE_URL + 'assets/css/bootstrap.min.css'} />
        {/* <!-- Owl Default CSS -->  */}
        <link rel="stylesheet" href={process.env.NEXT_PUBLIC_BASE_URL + 'assets/css/owl.default.min.css'} />
        {/* <!-- Owl Carousel CSS -->  */}
        <link rel="stylesheet" href={process.env.NEXT_PUBLIC_BASE_URL + 'assets/css/owl.carousel.min.css'} />
        {/* <!-- Owl Magnific CSS -->  */}
        <link rel="stylesheet" href={process.env.NEXT_PUBLIC_BASE_URL + 'assets/css/magnific-popup.min.css'} />
        {/* <!-- Animate CSS -->  */}
        <link rel="stylesheet" href={process.env.NEXT_PUBLIC_BASE_URL + 'assets/css/animate.min.css'} />
        {/* <!-- Boxicons CSS -->  */}
        <link rel="stylesheet" href={process.env.NEXT_PUBLIC_BASE_URL + 'assets/css/boxicons.min.css'} />
        {/* <!-- Flaticon CSS -->  */}
        <link rel="stylesheet" href={process.env.NEXT_PUBLIC_BASE_URL + 'assets/css/flaticon.css'} />
        <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
        {/* <!-- Meanmenu CSS --> */}
        <link rel="stylesheet" href={process.env.NEXT_PUBLIC_BASE_URL + 'assets/css/meanmenu.css'} />
        {/* <!-- Odometer CSS--> */}
        <link rel="stylesheet" href={process.env.NEXT_PUBLIC_BASE_URL + 'assets/css/odometer.min.css'} />
        {/* <!-- Style CSS --> */}
        <link rel="stylesheet" href={process.env.NEXT_PUBLIC_BASE_URL + 'assets/css/style.css'} />
        <link rel="stylesheet" href={process.env.NEXT_PUBLIC_BASE_URL + 'assets/css/style2.css'} />
        {/* <!-- RTL CSS --> */}
        <link rel="stylesheet" href={process.env.NEXT_PUBLIC_BASE_URL + 'assets/css/dark.css'} />
        {/* <!-- Responsive CSS --> */}
        <link rel="stylesheet" href={process.env.NEXT_PUBLIC_BASE_URL + 'assets/css/responsive.css'} />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        <link rel="icon" type="image/png" href={process.env.NEXT_PUBLIC_BASE_URL + 'assets/img/favicon.png'} />

       
        <link href={process.env.NEXT_PUBLIC_BASE_URL + "assets/admin/css/bootstrap.min.css"} id="bootstrap-style" rel="stylesheet" type="text/css" />
        <link href={process.env.NEXT_PUBLIC_BASE_URL + "assets/admin/css/icons.min.css"} rel="stylesheet" type="text/css" />
        <link href={process.env.NEXT_PUBLIC_BASE_URL + "assets/admin/css/app.min.css"} id="app-style" rel="stylesheet" type="text/css" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ti-icons@0.1.2/css/themify-icons.min.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@mdi/font@7.2.96/css/materialdesignicons.min.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.0/css/bootstrap.min.css.map" />
        <link rel="stylesheet" type="text/css" href="//cdn.datatables.net/1.10.24/css/jquery.dataTables.min.css"></link>
      </Head>    
      <body>
        <Main />
        <NextScript />

        <script src={process.env.NEXT_PUBLIC_BASE_URL + "assets/admin/libs/jquery/jquery.min.js"}></script>
        <script src={process.env.NEXT_PUBLIC_BASE_URL + "assets/admin/libs/bootstrap/js/bootstrap.bundle.min.js"}></script>
        <script src={process.env.NEXT_PUBLIC_BASE_URL + "assets/admin/libs/metismenu/metisMenu.min.js"}></script>
        <script src={process.env.NEXT_PUBLIC_BASE_URL + "assets/admin/libs/simplebar/simplebar.min.js"}></script>
        <script src={process.env.NEXT_PUBLIC_BASE_URL + "assets/admin/libs/node-waves/waves.min.js"}></script>

        <script src={process.env.NEXT_PUBLIC_BASE_URL + "assets/admin/libs/peity/jquery.peity.min.js"}></script>

       

        <script src={process.env.NEXT_PUBLIC_BASE_URL + "assets/admin/js/app.js"}></script>
        <script type="text/javascript" src="//cdn.datatables.net/1.10.24/js/jquery.dataTables.min.js"></script>

      </body>
    </Html>
  );
}
