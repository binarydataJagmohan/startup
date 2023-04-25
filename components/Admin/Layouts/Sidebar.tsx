import React from 'react'

const Sidebar = () => {
  return (
    <>
    <div className="vertical-menu">
  <div data-simplebar className="h-100">
    {/*- Sidemenu */}
    <div id="sidebar-menu">
      {/* Left Menu Start */}
      <ul className="metismenu list-unstyled" id="side-menu">
        <li className="menu-title">Main</li>
        <li>
          <a href="/admin/dashboard/" className="waves-effect">
            <i className="ti-home" /><span className="badge rounded-pill bg-primary float-end">1</span>
            <span>Dashboard</span>
          </a>
        </li>
        <li>
          <a href="" className=" waves-effect">
            <i className="ti-calendar" />
            <span>Calendar</span>
          </a>
        </li>
        {/* <li>
          <a href="javascript: void(0);" className="has-arrow waves-effect">
            <i className="ti-email" />
            <span>Email</span>
          </a>
          <ul className="sub-menu" aria-expanded="false">
            <li><a href="email-inbox.html">Inbox</a></li>
            <li><a href="email-read.html">Email Read</a></li>
            <li><a href="email-compose.html">Email Compose</a></li>
          </ul>
        </li> */}
        {/* <li className="menu-title">Components</li>
        <li>
          <a href="javascript: void(0);" className="has-arrow waves-effect">
            <i className="ti-package" />
            <span>UI Elements</span>
          </a>
          <ul className="sub-menu" aria-expanded="false">
            <li><a href="ui-alerts.html">Alerts</a></li>
            <li><a href="ui-buttons.html">Buttons</a></li>
            <li><a href="ui-cards.html">Cards</a></li>
            <li><a href="ui-carousel.html">Carousel</a></li>
            <li><a href="ui-dropdowns.html">Dropdowns</a></li>
            <li><a href="ui-grid.html">Grid</a></li>
            <li><a href="ui-images.html">Images</a></li>
            <li><a href="ui-lightbox.html">Lightbox</a></li>
            <li><a href="ui-modals.html">Modals</a></li>
            <li><a href="ui-offcanvas.html">Offcanvas</a></li>
            <li><a href="ui-rangeslider.html">Range Slider</a></li>
            <li><a href="ui-session-timeout.html">Session Timeout</a></li>
            <li><a href="ui-progressbars.html">Progress Bars</a></li>
            <li><a href="ui-sweet-alert.html">SweetAlert 2</a></li>
            <li><a href="ui-tabs-accordions.html">Tabs &amp; Accordions</a></li>
            <li><a href="ui-typography.html">Typography</a></li>
            <li><a href="ui-video.html">Video</a></li>
            <li><a href="ui-general.html">General</a></li>
            <li><a href="ui-colors.html">Colors</a></li>
            <li><a href="ui-rating.html">Rating</a></li>
            <li><a href="ui-utilities.html">Utilities</a></li>
          </ul>
        </li> */}
        {/* <li>
          <a href="javascript: void(0);" className="waves-effect">
            <i className="ti-receipt" />
            <span className="badge rounded-pill bg-success float-end">9</span>
            <span>Forms</span>
          </a>
          <ul className="sub-menu" aria-expanded="false">
            <li><a href="form-elements.html">Form Elements</a></li>
            <li><a href="form-validation.html">Form Validation</a></li>
            <li><a href="form-advanced.html">Form Advanced</a></li>
            <li><a href="form-editors.html">Form Editors</a></li>
            <li><a href="form-uploads.html">Form File Upload</a></li>
            <li><a href="form-xeditable.html">Form Xeditable</a></li>
            <li><a href="form-repeater.html">Form Repeater</a></li>
            <li><a href="form-wizard.html">Form Wizard</a></li>
            <li><a href="form-mask.html">Form Mask</a></li>
          </ul>
        </li> */}
        {/* <li>
          <a href="javascript: void(0);" className="has-arrow waves-effect">
            <i className="ti-pie-chart" />
            <span>Charts</span>
          </a>
          <ul className="sub-menu" aria-expanded="false">
            <li><a href="charts-morris.html">Morris Chart</a></li>
            <li><a href="charts-chartist.html">Chartist Chart</a></li>
            <li><a href="charts-chartjs.html">Chartjs Chart</a></li>
            <li><a href="charts-flot.html">Flot Chart</a></li>
            <li><a href="charts-knob.html">Jquery Knob Chart</a></li>
            <li><a href="charts-sparkline.html">Sparkline Chart</a></li>
          </ul>
        </li> */}
        {/* <li>
          <a href="javascript: void(0);" className="has-arrow waves-effect">
            <i className="ti-view-grid" />
            <span>Tables</span>
          </a>
          <ul className="sub-menu" aria-expanded="false">
            <li><a href="tables-basic.html">Basic Tables</a></li>
            <li><a href="tables-datatable.html">Data Tables</a></li>
            <li><a href="tables-responsive.html">Responsive Tables</a></li>
            <li><a href="tables-editable.html">Editable Tables</a></li>
          </ul>
        </li> */}
        <li>
          <a href="javascript: void(0);" className="has-arrow waves-effect">
            <i className="ti-face-smile" />
            <span>Icons</span>
          </a>
          <ul className="sub-menu" aria-expanded="false">
            <li><a href="icons-material.html">Material Design</a></li>
            <li><a href="icons-fontawesome.html">Font Awesome</a></li>
            <li><a href="icons-ion.html">Ion Icons</a></li>
            <li><a href="icons-themify.html">Themify Icons</a></li>
            <li><a href="icons-dripicons.html">Dripicons</a></li>
            <li><a href="icons-typicons.html">Typicons Icons</a></li>
          </ul>
        </li>
        <li>
          <a href="javascript: void(0);" className="waves-effect">
            <i className="ti-location-pin" />
            <span className="badge rounded-pill bg-danger float-end">2</span>
            <span>Maps</span>
          </a>
          <ul className="sub-menu" aria-expanded="false">
            <li><a href="maps-google.html"> Google Map</a></li>
            <li><a href="maps-vector.html"> Vector Map</a></li>
          </ul>
        </li>
        <li className="menu-title">Extras</li>
        <li>
          <a href="javascript: void(0);" className="has-arrow waves-effect">
            <i className="ti-layout" />
            <span>Layouts</span>
          </a>
          <ul className="sub-menu" aria-expanded="true">
            <li>
              <a href="javascript: void(0);" className="has-arrow">Vertical</a>
              <ul className="sub-menu" aria-expanded="true">
                <li><a href="layouts-light-sidebar.html">Light Sidebar</a></li>
                <li><a href="layouts-compact-sidebar.html">Compact Sidebar</a></li>
                <li><a href="layouts-icon-sidebar.html">Icon Sidebar</a></li>
                <li><a href="layouts-boxed.html">Boxed Layout</a></li>
                <li><a href="layouts-colored-sidebar.html">Colored Sidebar</a></li>
              </ul>
            </li>
            <li>
              <a href="javascript: void(0);" className="has-arrow">Horizontal</a>
              <ul className="sub-menu" aria-expanded="true">
                <li><a href="layouts-horizontal.html">Horizontal</a></li>
                <li><a href="layouts-hori-topbar-light.html">Light Topbar</a></li>
                <li><a href="layouts-hori-boxed.html">Boxed Layout</a></li>
              </ul>
            </li>
          </ul>
        </li>
        <li>
          <a href="javascript: void(0);" className="has-arrow waves-effect">
            <i className="ti-archive" />
            <span> Authentication </span>
          </a>
          <ul className="sub-menu" aria-expanded="false">
            <li><a href="pages-login.html">Login 1</a></li>
            <li><a href="pages-login-2.html">Login 2</a></li>
            <li><a href="pages-register.html">Register 1</a></li>
            <li><a href="pages-register-2.html">Register 2</a></li>
            <li><a href="pages-recoverpw.html">Recover Password 1</a></li>
            <li><a href="pages-recoverpw-2.html">Recover Password 2</a></li>
            <li><a href="pages-lock-screen.html">Lock Screen 1</a></li>
            <li><a href="pages-lock-screen-2.html">Lock Screen 2</a></li>
          </ul>
        </li>
        <li>
          <a href="javascript: void(0);" className="has-arrow waves-effect">
            <i className="ti-support" />
            <span>  Extra Pages</span>
          </a>
          <ul className="sub-menu" aria-expanded="false">
            <li><a href="pages-timeline.html">Timeline</a></li>
            <li><a href="pages-invoice.html">Invoice</a></li>
            <li><a href="pages-directory.html">Directory</a></li>
            <li><a href="pages-starter.html">Starter Page</a></li>
            <li><a href="pages-404.html">Error 404</a></li>
            <li><a href="pages-500.html">Error 500</a></li>
            <li><a href="pages-pricing.html">Pricing</a></li>
            <li><a href="pages-gallery.html">Gallery</a></li>
            <li><a href="pages-profile.html">Profile</a></li>
            <li><a href="pages-maintenance.html">Maintenance</a></li>
            <li><a href="pages-comingsoon.html">Coming Soon</a></li>
            <li><a href="pages-faq.html">FAQs</a></li>
          </ul>
        </li>
        <li>
          <a href="javascript: void(0);" className="has-arrow waves-effect">
            <i className="ti-bookmark-alt" />
            <span>  Email Templates</span>
          </a>
          <ul className="sub-menu" aria-expanded="false">
            <li><a href="email-template-basic.html">Basic Action Email</a></li>
            <li><a href="email-template-alert.html">Alert Email</a></li>
            <li><a href="email-template-billing.html">Billing Email</a></li>
          </ul>
        </li>
        <li>
          <a href="javascript: void(0);" className="has-arrow waves-effect">
            <i className="ti-more" />
            <span>Multi Level</span>
          </a>
          <ul className="sub-menu" aria-expanded="true">
            <li><a href="javascript: void(0);">Level 1.1</a></li>
            <li><a href="javascript: void(0);" className="has-arrow">Level 1.2</a>
              <ul className="sub-menu" aria-expanded="true">
                <li><a href="javascript: void(0);">Level 2.1</a></li>
                <li><a href="javascript: void(0);">Level 2.2</a></li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    {/* Sidebar */}
  </div>
</div>
    </>
  )
}

export default Sidebar