import React, { Component, Fragment } from 'react';
import Grid from '@material-ui/core/Grid';

import './termsofservice.css';
import logoLight from '../../assets/atclightlogo.png';

class TermsOfService extends Component {
    render(){
        return(
            <div classNames="tscontainer">
                <div className="tsheader">
                    <div className="tslogo">
                        <img src={logoLight}/>
                    </div>
                </div>
                <div className="clearboth"></div>
                <div className="tsbody">
                    <div className="tsbodycontent">
                    <p className="heading">Terms & Conditions</p>
                    <p className="tscontent">By signing up for Around the Corner services or any of the services of Around the Corner, LLC or its affiliates 
                    (“Around the Corner”) you are agreeing to be bound by the following terms and conditions (“Terms of Service”). 
                    The services offered by Around the Corner under the Terms of Service include various products and 
                    services to help you display and sell goods and services to buyers online (“Online Services”). 
                    Any such services offered by Around the Corner are referred to in these Terms of Services as the “Services”. 
                    Any new features or tools which are added to the current Services shall be also subject to the Terms of Service. 
                    Around the Corner reserves the right to update and change the Terms of Service by posting updates and changes to the 
                    Around the Corner website. You are advised to check the Terms of Service from time to time for any updates or changes 
                    that may impact you.</p>
  
                    <p className="tscontent">You must read, agree with and accept all of the terms and conditions contained in this Terms of Service agreement,
                    including the Privacy Policy, before you may become an Around the Corner user.</p>
 
 
                    <p className="heading">Privacy Policy</p>
  
                    <p className="heading">What information do we collect from businesses?</p>
  
                    <p className="tscontent">We collect your business details, including, but not limited to: name, company name, address, email address, and phone 
                    number. We use this information to provide our Services to you; for example, to confirm your identity, contact you, and
                    invoice you. We also use this information to make sure that we comply with legal requirements.</p>
  
                    <p className="tscontent">We collect data about how and when you access your account, including information about the device and browser you use, 
                    your network connection, and your IP address. We use this information to give you access to our Services. We also use this
                    information to make our platform easier to use and to personalize the Services for you.</p>
  
                    <p className="tscontent">When we need to verify your identity (such as, if there are concerns about identity theft or we need to authenticate your 
                    account for support), we may request that you provide us with government-issued identification information.</p>
  
                    <p className="heading">When do we collect this information?</p>

                    <p className="tscontent">We collect personal information when you sign up for our Services, when you access our Services or 
                    otherwise provide us with the information.</p>
  
                    <p className="heading">When and why do we share this information with third parties?</p>
                    <p className="tscontent">Around the Corner works with some third-party service providers (such as Shopify) to help provide you with our Services and 
                    we may share personal information with them to support these efforts.</p>
  
                    <p className="tscontent">We may also share your information in the following circumstances:</p>
  
                    <p className="tscontent">To prevent, investigate, or take action against illegal activities, suspected fraud, violations of our Terms of Service or 
                    any other agreement related to the Services, or as otherwise required by law. To help us conduct marketing and/or advertising campaigns.
                    To conform to legal requirements, or to respond to lawful court orders, subpoenas, warrants, or other requests by public authorities 
                    (including to meet national security or law enforcement requirements). Personal information may also be shared with a company that
                    acquires our business, whether through merger, acquisition, bankruptcy, dissolution, reorganization, or other similar transaction 
                    or proceeding. If this happens, we will post a notice on our home page.</p>
  
                    <p className="tscontent">Around the Corner will always ask for your consent before sharing your personal information with third parties for purposes other
                    than those described in this Section 2.</p>
  
                    <p className="heading">Information from customers</p>
                    <p className="tscontent">We collect from our customers their name, email, IP address, information about items you favorite, information about 
                    the stores that you visit, and information about the device and browser you use.</p>
  
                    <p className="tscontent">We use this information to provide our merchants with the Services, including data about products. We also use this 
                    information to improve our Services. We may use some of the personal information you provide for automated decision-making.
                    For example, we may use certain personal information, such as IP addresses, to automatically block certain potentially 
                    fraudulent activity.</p>
  
                    <p className="heading">When do we collect this information?</p>
                    <p className="tscontent">We collect this information when you sign up or access our Services.</p>
  
                    <p className="tscontent">We may also share your information in the following circumstances:</p>
  
                    <p className="tscontent">To prevent, investigate, or take action against illegal activities, suspected fraud, violations of our Terms of Service or
                    any other agreement related to the Services, or as otherwise required by law. To help us conduct marketing and/or advertising
                    campaigns. To conform to legal requirements, or to respond to lawful court orders, subpoenas, warrants, or other requests by
                    public authorities (including to meet national security or law enforcement requirements). Personal information may also be
                    shared with a company that acquires our business, whether through merger, acquisition, bankruptcy, dissolution, 
                    reorganization, or other similar transaction or proceeding. If this happens, we will post a notice on our home page.</p>

                    </div>
                </div>                
            </div>
        )
    }
}   

export default TermsOfService