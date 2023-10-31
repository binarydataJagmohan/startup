import React, { useState, useEffect } from 'react'
import { fetchPrivacyPoliciesdata } from '@/lib/frontendapi';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import Image from 'next/image';
const QuillNoSSRWrapper = dynamic(import('react-quill'), {
    ssr: false,
    loading: () => <p>Loading...</p>,
});

export default function PrivacyPolicy() {
    const [privacydata, setPrivacyData] = useState('');
    useEffect(() => {
        // Fetch existing data from the database
        fetchPrivacyPolicies();
    }, []);
    const fetchPrivacyPolicies = async () => {
        try {
            const response = await fetchPrivacyPoliciesdata();
            const data = response.data;


            // Set the fetched data as initial content in the editor

            setPrivacyData(data);
        } catch (error) {
            // Handle error
        }
    };
    return (
        <>
            {/* <div className="page-title-area item-bg-1">
                <div className="d-table">
                    <div className="d-table-cell">
                        <div className="container">
                            <div className="page-title-content">
                                <h2>Privacy Policy</h2>
                                <ul>
                                    <li><Link href="index.html">Home</Link></li>
                                    <li>Privacy Policy</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
            <section className="term-conditions py-5">
                <div className="container">
                    <p>The privacy policy (“Privacy Policy”) governs the use of the website of Rising Capitalist Private Limited (“RCPL”) dba RisingCapitalist [https://www.risingcapitalist.com/] (“Website”, “we”, “us”) and the services (“Services”) being provided on the Website. By using the Website, you agree to abide by the terms and conditions pertaining to collection, retention, and use of information set forth in this Privacy Policy. If you do not agree to the Privacy Policy, you may exit and cease to use the Website. This Privacy Policy is incorporated in the Terms and Conditions of the Website and any other agreement, in which there is a specific clause incorporating the Privacy Policy in such agreement. In the event of a conflict between the terms of such agreements and the Privacy Policy, the terms of such agreements will prevail and govern so long as they relate to matters specifically referenced herein and this Privacy Policy will apply with respect to all other matters.</p>
                    <p>Definitions:</p>
                    <p>"Applicable Laws" shall mean the Information Technology Act, 2000 and Rules thereunder as amended from time to time.</p>
                    <p>"User" shall mean and refer to natural and legal individuals who use the Website.</p>
                    <p>"Information" shall mean and refer to natural and legal individuals who use the Website.</p>
                    <p>"Personal information" means any information that relates to a natural person, which, either directly or indirectly, in combination with other information available or likely to be available with a body corporate, is capable of identifying such person.</p>
                    <p>"Rules" shall mean the Information Technology (Reasonable security practices and procedures and sensitive personal data or information) Rules, 2011 as amended from time to time.</p>
                    <p>"Sensitive Personal Data and Information (SPDI)" shall mean and include such personal information which consists of information relating to:- (i) password; (ii) financial information such as Bank account or credit card or debit card or other payment instrument details ; (iii) physical, physiological and mental health condition; (iv) sexual orientation; (v) medical records and history; (vi) Biometric information; (vii) any detail relating to the above clauses as provided to body corporate for providing service; and (viii) any of the information received under above clauses by body corporate for processing, stored or processed under lawful contract or otherwise:</p>
                    <p>provided that, any information that is freely available or accessible in public domain or furnished under the Right to Information Act, 2005 or any other law for the time being in force shall not be regarded as sensitive personal data or information for the purposes of these rules.</p>
                    <div className="all-type-of-text">
                        <h1>1. General Terms</h1>
                        <ol type="a">
                            <li>RCPL and its officers, directors, managers, partners, members, shareholders, employees, affiliates and agents make no representations or warranties and specifically disclaim any and all warranties of any kind, express or implied, with respect to the Website and any content therein, including any representations or warranties with respect to merchantability, fitness for a particular purpose, title, non-infringement, availability, security, accuracy, freedom from viruses, malware or other damaging software, completeness, timeliness, functionality, reliability, sequencing or speed of delivery.</li>
                            <li>RCPL reserves the right to cease providing, or to change, the Website and content of such information (or any portion or feature thereof) at any time or frequency and without notice. All content on the Website is presented only as of the date published or indicated and may be superseded by subsequent market events or for other reasons. Any transactions described on the Website are for illustrative purposes only and may not be representative of all transactions engaged in by RCPL.</li>
                        </ol>
                        <h1>2. Our role in the protection of User Information</h1>
                        <ol type="a">
                            <li>Our role in the protection of User Information.</li>
                            <li>Upon landing on the Website, as a rule, we do not collect any information from you. However, we collect, retain and process the information provided by you through e-mail or filing of forms on the Website including but not limited to Information such as your name, address, contact details, email id, details of the organization on behalf of whom you are acting (if applicable) and financial information such as bank account or credit card or debit card or other payment instruments, identity proof, etc. (“Personal Information”).</li>
                            <li>Further, we collect, store, and process such other information including but not limited to your Authentication Token, communication made by you, information posted by you on the chat rooms, and any modifications made to the information provided by you (“Other Information”).</li>
                            <li>We may also collect certain automatically generated information including the IP address, date and time of visiting the Website, online activity. We may engage third-party services to monitor and collect such information that will enable us to verify your credentials, maintain reasonable security practices, enable inclusion of better Services, fulfill your requests and enhance your user experience. Further, we may also collect cookies (a piece of software code that the Website automatically sends to your browser when you access the Website) that enable us to provide you a better user experience. We do not link the information we store on the cookies to any personally identifiable information submitted by you. Also, some of the business partners’ i.e., third parties operating in association with the Website have cookies on our Website. The use of cookies by them is subject to the privacy policy and other terms and conditions governing their website (“Automatically Generated Information”), Personal Information, Other Information, and Automatically Generated Information shall together be referred to as “User Information”</li>
                            <li>The User Information provided by you may be used by us and provided to third party websites, affiliates, consultants, employees in order to manage, collect, store, process the User Information in order to improve the quality, design, functionality, and content of the Website and to any governmental authority under applicable law.</li>
                            <li>The User Information provided by you shall be used to communicate with us through newsletters, updates, notifications, and other forms of communication. Further, we may telephonically contact you to collect or verify the information provided by you. The communication with you might be recorded but will be kept confidential otherwise when asked to disclose to any governmental authority under applicable law.</li>
                            <li>The User Information shall be used for purposes only in relation to the Website and not for any other purposes. The User Information shall be retained till the termination of your membership/listing on the Website or up to such other period as may be considered necessary by us for the purpose of operating the Website.</li>
                            <li>You shall have the right to view the information provided by you and also to update the information and keep us informed of any such change in case the information provided is deficient or inaccurate.</li>
                            <li>You undertake that the Personal Information and Other Information provided by you is true and accurate to the best of your knowledge. You agree and understand that we shall not be liable for the authenticity of the Personal Information and Other Information provided by you.</li>
                            <li>You shall provide us with all the information requested from you on the Website or through any other mode of communication. You are not legally obligated to provide us with all the information. However, the complete functionality of the Website shall not be rendered possible if you fail to provide us with the certain necessary information for the purpose of the Services of the Website. Without prejudice to the aforesaid, you shall have an option too, while availing the Services otherwise, withdraw your consent to allow us to use the Personal Information provided by you and intimate us of the same in writing.</li>
                        </ol>
                        <h1>3. Disclaimer</h1>
                        <ol type='a'>
                            <li>RCPL cannot ensure that all of User’s private communications and other Information will never be disclosed in ways not otherwise described in this Privacy Policy. Therefore, although RCPL is committed to protecting User’s privacy, RCPL does not promise, and User should not expect, that the User’s Information will always remain private. As a User of the Website, you understand and agree that User assumes all responsibility and risk for usage of the Website, the internet in general, and the documents you post and access, and for User’s conduct on and off the Website.</li>
                        </ol>
                        <h1>4. Disclosure of User Information</h1>
                        <ol type='a'>
                            <li>Any Personal Information provided by you shall be made available to only our affiliates, third parties, employees, consultants, screening committee members, mentors, or other officers that are connected with or in relation to the Services of the Website. Such third parties shall not disclose the User Information disclosed to it further other than under such circumstances where disclosure is permissible by us under the terms and conditions of the Privacy policy.</li>
                            <li>Other than as set out above, we shall not disclose the User Information to any third-party without your written consent provided that such information may be disclosed to governmental agencies or bodies as required under applicable law or to exercise legal rights or defend legal claims or protect the safety of other users or public or our rights.</li>
                        </ol>
                        <h1>5. Links to third-party websites</h1>
                        <ol type='a'>
                            <li>The Website contains links to third-party websites. We are not responsible for any content on such third-party websites and we shall not be liable for any breach of the privacy policy by such websites. You undertake to read and understand the privacy policy of such third-party websites. For the avoidance of doubt, our Privacy Policy only governs the User Information collected, received, possessed, stored, dealt, with, or handled for the purposes of Services on our Website.</li>
                        </ol>
                        <h1>6. Notification and Updates sent by the Website</h1>
                        <ol type='a'>
                            <li>We send an email notification to individuals once they login to the Website as a member. Further, we may send regular newsletters, updates, and other promotional information to you informing you of the updates on the Website.</li>
                            <li>Out of courtesy towards your privacy, we give you the option to opt-out of any Services on the Website. If you choose not to opt-out of any particular Service, you agree to get information regarding such Services. In order to clarify, we only send you information if you have chosen to receive it. In case you wish to discontinue any Services, you can choose to unsubscribe such Services by choosing the unsubscribe option in the emails sent to you or tabs available on the Website. However, you shall not be able to opt-out of any Service notification that may be necessary in the process of the Website or that may be important to you as a member.</li>
                        </ol>
                        <h1>7. Security Practices</h1>
                        <ol type='a'>
                            <li>The User Information shall be governed by and protected by us according to the security practices and procedures mandated under the Act and more particularly described under the Information Technology (Reasonable Security Practices & Procedures and Sensitive Personal Data or Information) Rules, 2011 and Information Technology (Intermediary Guidelines) Rules, 2011.</li>
                            <li>RCPL does not recommend transfer of SDPI (such as credit card number) and bank account details via the Website to other users. Users are recommended to do so offline, on the phone or via personal emails. RCPL follows generally accepted industry standards to protect the Information submitted to us, both during transmission and after RCPL receives it. However, "perfect security" does not exist on the internet. User, therefore, agree that security breaches beyond the control of RCPL’ standard security procedures are at User’s sole risk and discretion.</li>
                        </ol>
                        <h1>8.	Alteration of the Privacy Policy</h1>
                        <ol type='a'>
                            <li>The Privacy Policy may be amended, modified, or refined from time to time at our sole discretion and the updated Privacy Policy shall be published on the Website and no separate communication shall be made in respect of the same. It shall be your responsibility to keep yourself updated with changes to the Privacy Policy by regularly checking the Website for updates. Usage of the Website’s Services pursuant to a change in its Privacy Policy shall be deemed to be acquiescence of the changed Privacy Policy on your behalf.</li>
                        </ol>
                        <h1>9.	Disclaimer of liability for User Information Security</h1>
                        <ol type='a'>
                            <li>We take appropriate measures as envisaged under Clause 5 of the Privacy Policy for the protection of the User Information. All the employees, consultants, screening committee members, mentors, and officers shall always be kept updated on the security and privacy protection procedures or methods.</li>
                            <li>Notwithstanding the aforesaid, despite our efforts to maintain privacy and confidentiality of the User Information, we may not be able to protect or prevent the unauthorized access or use, software failure or fault, or other factors that may compromise the security of the User Information.</li>
                            <li>You agree and understand that the Internet is not a secure source and therefore, we cannot guarantee the protection of such User Information.</li>
                        </ol>
                        <h1>10.	Grievance Redressal Mechanism</h1>
                        <ol type='a'>
                            <li>In order to address any of your grievances or discrepancies of the information displayed on the Website, the Website shall designate a grievance redressal officer (“Grievance Officer”) who can be reached at support@risingcapitalist.com.</li>
                        </ol>
                    </div>
                </div>
            </section>
        </>
    )
}