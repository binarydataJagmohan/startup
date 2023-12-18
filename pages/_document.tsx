
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
        {/* <link rel="stylesheet" href={process.env.NEXT_PUBLIC_BASE_URL + 'assets/css/magnific-popup.min.css'} /> */}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/magnific-popup.js/1.1.0/magnific-popup.min.css" />
        {/* <!-- Animate CSS -->  */}
        {/* <link rel="stylesheet" href={process.env.NEXT_PUBLIC_BASE_URL + 'assets/css/animate.min.css'} /> */}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />

        {/* <!-- Boxicons CSS -->  */}
        {/* <link rel="stylesheet" href={process.env.NEXT_PUBLIC_BASE_URL + 'assets/css/boxicons.min.css'} /> */}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/boxicons/2.1.4/css/boxicons.min.css" />

        {/* <!-- Flaticon CSS -->  */}
        <link rel="stylesheet" href={process.env.NEXT_PUBLIC_BASE_URL + 'assets/css/flaticon.css'} />
        <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />     
        {/* <!-- Style CSS --> */}
        <link rel="stylesheet" href={process.env.NEXT_PUBLIC_BASE_URL + 'assets/css/style.css'} />
        <link rel="stylesheet" href={process.env.NEXT_PUBLIC_BASE_URL + 'assets/css/style2.css'} />       
        {/* <!-- Responsive CSS --> */}
        <link rel="stylesheet" href={process.env.NEXT_PUBLIC_BASE_URL + 'assets/css/responsive.css'} />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        <link rel="icon" type="image/png" href={process.env.NEXT_PUBLIC_BASE_URL + 'assets/images/favicon.png'} />


        <link href={process.env.NEXT_PUBLIC_BASE_URL + "assets/admin/css/bootstrap.min.css"} id="bootstrap-style" rel="stylesheet" type="text/css" />
        {/* <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" id="bootstrap-style" rel="stylesheet" type="text/css" /> */}

        <link href={process.env.NEXT_PUBLIC_BASE_URL + "assets/admin/css/icons.min.css"} rel="stylesheet" type="text/css" />
        <link href={process.env.NEXT_PUBLIC_BASE_URL + "assets/admin/css/app.min.css"} id="app-style" rel="stylesheet" type="text/css" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ti-icons@0.1.2/css/themify-icons.min.css" />
        {/* <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" /> */}
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@mdi/font@7.2.96/css/materialdesignicons.min.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.0/css/bootstrap.min.css.map" />
        <link rel="stylesheet" type="text/css" href="//cdn.datatables.net/1.10.24/css/jquery.dataTables.min.css"></link>
        <link href="https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@200;300;400;500;600;700;800;900&family=Source+Serif+4:ital,opsz,wght@0,8..60,200;0,8..60,300;0,8..60,400;0,8..60,500;0,8..60,600;0,8..60,700;0,8..60,800;0,8..60,900;1,8..60,200&display=swap" rel="stylesheet"></link>
      </Head>
      <body>
        <Main />
        <NextScript />
        {/* <script src={process.env.NEXT_PUBLIC_BASE_URL + "assets/admin/libs/jquery/jquery.min.js"}></script> */}
        <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>

        {/* <script src={process.env.NEXT_PUBLIC_BASE_URL + "assets/admin/libs/bootstrap/js/bootstrap.bundle.min.js"}></script> */}
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>

        {/* <script src={process.env.NEXT_PUBLIC_BASE_URL + "assets/admin/libs/metismenu/metisMenu.min.js"}></script> */}
        <script src="https://cdn.jsdelivr.net/npm/metismenu@3.0.7/dist/metisMenu.min.js"></script>

        {/* <script src={process.env.NEXT_PUBLIC_BASE_URL + "assets/admin/libs/simplebar/simplebar.min.js"}></script> */}
        <script src="https://cdn.jsdelivr.net/npm/simplebar@6.2.5/dist/simplebar.min.js"></script>

        {/* <script src={process.env.NEXT_PUBLIC_BASE_URL + "assets/admin/libs/node-waves/waves.min.js"}></script> */}
        <script src="https://cdn.jsdelivr.net/npm/node-waves@0.7.6/dist/waves.min.js"></script>

        {/* <script src={process.env.NEXT_PUBLIC_BASE_URL + "assets/admin/libs/peity/jquery.peity.min.js"}></script> */}
        <script src="https://cdn.jsdelivr.net/npm/peity@3.3.0/jquery.peity.min.js"></script>

        <script src={process.env.NEXT_PUBLIC_BASE_URL + "assets/admin/js/app.js"}></script>
        <script type="text/javascript" src="//cdn.datatables.net/1.10.24/js/jquery.dataTables.min.js"></script>

      </body>
    </Html>
  );
}