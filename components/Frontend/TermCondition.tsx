import React, { useEffect, useState } from "react";
import { fetchTermsAndConditionsdata } from "@/lib/frontendapi";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});
export default function TermCondition() {
  const [termdata, setTermData] = useState("");
  useEffect(() => {
    // Fetch existing data from the database
    fetchTermsAndConditions();
  }, []);
  const fetchTermsAndConditions = async () => {
    try {
      const response = await fetchTermsAndConditionsdata();
      const data = response.data;
      // Set the fetched data as initial content in the editor
      setTermData(data);
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
                                <h2>Terms &amp; Conditions</h2>
                                <ul>
                                    <li><Link href="index.html">Home</Link></li>
                                    <li>Terms &amp; Conditions</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
      <section className="term-conditions py-5">
        <div className="container">
          <h3>Terms of Use</h3>
          <p>
            These Terms of Use including the Privacy Policy, and Risks (“Terms
            of Use”) govern the use of the website of Rising Capitalist Private
            Limited (“RCPL”) dba RisingCapitalist
            [https://www.risingcapitalist.com/] (“Website”) and the services
            (“Services”) provided on the Website. By using the Website including
            but not limited to accessing or visiting or browsing the Website,
            you (“Visitor/User/Member”) indicate your acceptance to these Terms
            of Use and that you agree to abide by them. The Terms of Use
            constitute a legal agreement between you, as the user of the
            Website, and us, the owner of the Website. If you do not agree to
            these Terms of Use, please refrain from using this Website. The
            Terms of Use shall be considered as part of any agreement, the
            reference to which shall be made in that agreement and shall be read
            along with the terms and conditions of that agreement. In the event
            of a conflict between the terms of such agreements and the Terms of
            Use, the terms of such agreements will prevail and govern so long as
            they relate to matters specifically referenced herein and this Terms
            of Use will apply with respect to all other matters.
          </p>
          <div className="all-type-of-text">
            <h4>1. Information about us and the Website</h4>
            <ol>
              <li>
                The Website is owned and operated by RCPL (“we/us/our”). We have
                been incorporated under the Companies Act, 2013 under CIN
                U82990MH2023PTC410806 having its registered office at Shop No 13
                Trishul Terraces, Sector 20 Koparkhairne, Thane, Maharashtra -
                400709.
              </li>
              <li>
                The Website enables startup companies to display their business
                ideas and run a fundraising campaign on the Website and
                facilitates potential investors to decide regarding investing in
                such ventures. The Website also provides the early-stage
                ventures and the potential investors with such other information
                and service as are necessary or incidental to the principal
                activity described here.
              </li>
              <li>
                The Website also provides general company services such as
                company incorporation, CFO services and legal services related
                to fundraising.
              </li>
            </ol>
            <h4>2. Access to the Website</h4>
            <ol>
              <li>
                By accessing the Website, you agree to these Terms of Use and
                the Privacy Policy set out. The access to certain sections of
                the Website is conditional upon our acceptance of you as a
                “member” or ‘issuing company’ or ‘issuer’ on the Website. We
                reserve the right to withdraw or amend the Services being
                provided to you through the Website without any notice. We will
                not be liable if for any reason our Website is not available to
                you at any period of time. Further, we have the right to
                restrict your access to the whole or part of the Website.
              </li>
              <li>
                All rights that are not expressly granted to you are reserved
                under these Terms of Use.
              </li>
            </ol>
            <h4>3. Registration and Membership</h4>
            <ol>
              <li>
                If you are interested in exploring opportunities of investing in
                the issuer companies seeking to raise funding through the
                Website, in order to have full functionality of the Website, you
                will have to register as a ‘member’ on the Website. The terms of
                registration including eligibility criteria and rights after
                becoming a member are available on our Website, and you may view
                them once you become a member. In case of a conflict between the
                Terms of Use and the specific condition governing membership of
                the Website, the specific conditions of membership shall
                prevail.
              </li>
              <li>
                If you are interested in running a fundraising campaign through
                the Website, in order to have full functionality of the Website,
                you will have to register as an ‘issuing company’ or the
                ‘issuer’ with us. The terms of registration including
                eligibility criteria and rights after enrolling as an ‘issuing
                company’ or ‘issuer’ are available on our Website. In case of a
                conflict between the Terms of Use and the specific condition
                governing your status as an ‘issuer company’ or ‘issuer’ on the
                Website, the specific conditions applicable to ‘issuer company’
                or ‘issuer’ shall prevail.
              </li>
            </ol>
            <h4>4. Password to the Website</h4>
            <ol>
              <li>
                Upon completion of your registration to the Website, and upon
                reasonable satisfaction of our understanding of your engagement
                with us, an OTP to the email ID specified by you shall be
                provided. That OTP confirmation will allow you to participate in
                the fundraising campaign in which you have evinced your
                interest.
              </li>
              <li>
                You agree not to provide your username and password information
                to any other person other than with us.
              </li>
              <li>
                You agree to keep your password secure. You are fully
                responsible for any loss or damage resulting from your failure
                to protect your password. You agree to immediately notify us of
                any unauthorized use of your password or any other breach of the
                security.
              </li>
              <li>
                You agree that we shall not be liable for any loss or damage
                arising out of our failure to keep your password secure.
              </li>
            </ol>
            <h4>5. Representations and Warranties of Users</h4>
            <ol>
              <li>
                You’re entering these Terms of Use on your own behalf or on
                behalf of the entity for whom you are acting provides a
                representation that you agree to abide by the Terms of Use or
                such other agreements that you may enter while browsing through
                the Website. You agree to stop using the Website and inform us
                of any violation of law that may stop you from using our
                Website.
              </li>
              <li>
                You represent that all the information provided by you is true,
                correct, and accurate and you shall inform us of any change/
                amendment in such information from time to time.
              </li>
              <li>
                You shall not host, display, upload, modify, publish, transmit,
                update or share any information that: (i) belongs to another
                person and to which you do not have any right to; (ii) is
                grossly harmful, harassing, libellous, invasive of another’s
                privacy, hateful or racially, ethnically objectionable,
                disparaging, relating or encouraging money laundering or
                gambling, otherwise unlawful in any manner whatsoever; (iii)
                harms minors in any way; (iv) infringes any patent trademark,
                copyright or other proprietary rights; (v) violates any law for
                the time being in force; (vi) deceives or misleads the addressee
                about the origin of such messages or communicates any
                information which is grossly offensive or menacing in nature;
                (vii) impersonates another person; (viii) threatens the unity,
                integrity, defence, security or sovereignty of India, friendly
                relations with friendly states, or public order or causes
                incitement to the commission of any cognisable offence or
                prevents investigation of any offence or is insulting any other
                nation.
              </li>
              <li>
                You agree and understand that you shall not sell your access to
                the Website. You shall not transmit any unnecessary information
                or unwanted electronic communication viz. spam to other members
                of the Website. You will not misuse your right to the Website by
                introducing viruses, trojans, worms, or other material likely to
                cause harm to the Website and shall indemnify and keep us
                indemnified in case any action is initiated against us due to
                any loss, injury, expenses or liability caused to any other user
                of the Website or any third-party. You shall further not gain
                any unauthorized access to the Website or on any other source to
                our Website.
              </li>
            </ol>
            <h4>6. Our rights in relation to the Website</h4>
            <ol>
              <li>
                We have the right to discontinue or change our Services at any
                time and shall not be liable for the same.
              </li>
              <li>
                We shall delete your account or cancel access to the Website for
                any reason whatsoever, at any time at our discretion. We shall
                also suspend or limit your access to the Website as and when may
                be considered necessary. For the aforesaid, we shall make all
                reasonable efforts to notify you and inform you of such an
                action and the reasons thereof, in any.
              </li>
              <li>
                We shall disclose such confidential information as may be
                provided by you or such other details about yourself as may be
                necessary to satisfy any governmental department or authority
                under applicable law or to any third-party in accordance with
                the terms of the Privacy Policy.
              </li>
              <li>
                With reference to Clauses 6.1, 6.2 and 6.3, you agree and
                understand that we shall not be liable for any claim based on
                any termination, suspension or any of the aforesaid actions
                taken by us in relation to your access to the Website.
              </li>
              <li>
                We may invite you to participate in the chat rooms or other
                features that will give you an opportunity to know about the
                Website, the companies and the fundraising campaigns of such
                companies. The comments or other information provided by you on
                such chat rooms shall be deemed to have been licensed to us on a
                free and permanent basis.
              </li>
            </ol>
            <h4>7. Intellectual Property Rights</h4>
            <ol>
              <li>
                When you visit our Website, we give you a limited license to
                access and use our information for personal use.
              </li>
              <li>
                You are permitted to download the information available on the
                Website to any instrument for your personal use only provided
                that you do not delete or change any copyright symbol, trademark
                or other proprietary details. You shall not use our information
                for any other purpose other than for the aforesaid. You agree
                that any use of the proprietary information displayed on the
                Website shall infringe our intellectual property rights for
                which you shall indemnify us.
              </li>
              <li>
                We have copyright on all the contents displayed on the Website
                including graphics, logo, sound recordings and software that is
                either owned or licensed to us other than any third-party
                contents which are specifically identified as such. Any
                infringement of our intellectual property rights shall be
                governed by the applicable law in India.
              </li>
              <li>
                The license to access and use the Website does not include the
                right to copy or reproduce the information of our Website on any
                other platform or medium, without our prior written permission.
              </li>
              <li>
                Except where otherwise specified, any word, logo or device to
                which is attached the symbols ™ or ® shall be considered as a
                registered trademark that is either owned by us or which we have
                a license to use. The right to use the Website does not give a
                license to use those trademarks in any way.
              </li>
            </ol>
            <h4>8. Linked Websites</h4>
            <ol>
              <li>
                You may be able to access and view third-party websites through
                this Website. The links are provided for your convenience only
                and may not be updated at all times.
              </li>
              <li>
                We do not endorse, review, control or examine third-party
                websites and we are not responsible for any content posted on
                such third-party websites. You understand that the inclusion of
                links on the Website is not intended as an endorsement or
                recommendation of any linked website or content of such website.
              </li>
              <li>
                You agree that your access to any third-party website is
                governed by the terms of use of that website, and has no
                relation to the Terms of Use of the Website. You agree and
                understand that it is your responsibility to comply with the
                terms and conditions of that website as well.
              </li>
            </ol>
            <h4>9. Disclaimers and Limitation of Liability</h4>
            <ol>
              <li>
                You agree and understand that the use of the Website is at your
                own risk. The Website is being made available to you on an “as
                is” and “as available” basis without providing any warranties,
                guarantees or conditions as to the usage being free from any
                faults, defects, interruptions, errors, viruses or to the
                accuracy, reliability, availability of content. You agree and
                understand that we shall not be responsible for any interference
                or damage that may be caused to your computer resource which
                arises in connection with your access to our Website.
              </li>
              <li>
                You agree that no refunds will be processed in any of the
                offerings listed on the website.
              </li>
              <li>
                You also agree and understand that the information displayed on
                the Website is for information purposes only and does not amount
                to any advice.
              </li>
              <li>
                Any content or services provided through the Website shall not
                be construed as investment advice by RCPL or an opinion provided
                by RCPL regarding the appropriateness or suitability of any
                investment, or a recommendation or an offer or solicitation by
                RCPL or the new and growing businesses for the purchase or sale
                of any security or securities in general, nor otherwise an
                endorsement, inducement, or solicitation of any type.
              </li>
              <li>
                You acknowledge and agree that by the mere fact of registering
                on the Website, you do not acquire any right to subscribe to the
                shares of any of the said businesses. Such right to subscribe to
                the shares of any of the said businesses shall be conferred upon
                you only in the event that such business or entity extends an
                express invitation or offer to you to subscribe to the shares of
                such business or entity.
              </li>
              <li>
                To the extent permitted by applicable law, we disclaim our
                liability against any loss, damage, expenses, liabilities,
                claim, injury caused due to the failure of performance,
                omission, defect, deletion, interruption, error, delay, virus,
                communication, unauthorized access, theft, destruction,
                alteration or use of records, whether due to breach of the
                contract, negligence, tort or due to other cause of actions.
              </li>
              <li>
                Further, we shall not be responsible for any loss of profits,
                goodwill, revenue, consequential, exemplary, punitive damages or
                any financial or indirect loss.
              </li>
              <li>
                You further acknowledge and agree that we shall not be
                responsible for any defamatory, offensive or illegal conduct of
                third parties on our Website, including users and operators of
                third-party websites. Further, we shall not be responsible or be
                held liable for any inaccuracy, delay, omission or defect,
                transmission or delivery of any third-party data or any loss or
                damage arising from: (i) any inaccuracy, error, delay or
                omission of transmission of information; (ii) non-performance by
                any third-party; or (iii) interruption caused due to any
                third-party due to their negligent act or omission any other
                cause, not beyond the reasonable control of us.
              </li>
              <li>
                Notwithstanding anything in the Terms of Use, under no
                circumstances will we be liable to you for any direct, indirect,
                consequential and/or incidental damages in relation to the use
                of the Website or it's Services.
              </li>
              <li>
                RCPL is not a stock exchange recognised by the Securities
                Exchange Board of India (SEBI ) under the Securities Contract
                (Regulation) Act, 1956. The securities offered by any Startup
                registered on the Website are not traded on any stock exchange
                recognised by SEBI. RCPL does not allow any secondary market
                trading of securities on the Website.
              </li>
            </ol>
            <h4>10. Indemnity</h4>
            <ol>
              <li>
                You hereby agree to indemnify and hold us harmless from and
                against any loss, damage, expenses, liabilities or claims
                arising out of or in relation to your failure to comply with the
                Terms of Use or any misstatement or breach of any
                representations or warranties made by you under the Terms of Use
                or under any conditions on the Website accepted by you.
              </li>
            </ol>
            <h4>11. Governing Law and Dispute Resolution</h4>
            <ol>
              <li>
                Governing Law: The Terms of Use shall be governed by and
                construed in all respects in accordance with the laws of India
                and subject to Clause 11.3 below, the courts of Mumbai shall
                have exclusive jurisdiction.
              </li>
              <li>
                Informal Dispute Resolution: The Parties agree to attempt to
                resolve all disputes arising hereunder, promptly and in good
                faith and in this regard, each Party shall each designate in
                writing to the other Party, a representative who shall be
                authorized to negotiate and resolve on its behalf any dispute
                arising under these Terms of Use. If the designated
                representatives of each of the Parties are unable to resolve a
                dispute under the Terms of Use within 30 (thirty) days after
                notice of such dispute shall have been given by either of the
                Parties to the other, then either Party may require that such
                dispute be determined and resolved by arbitration.
              </li>
              <li>
                Arbitration: Subject to Clause 11.2, any dispute or claim under
                the Terms of Use shall be referred to and finally and
                exclusively resolved by arbitration in accordance with the
                Arbitration and Conciliation Act, 1996 or any statutory
                modification or re-enactment thereof for the time being in
                force. The arbitration shall be held at Mumbai and all
                proceedings in any such arbitration shall be conducted in
                English. There shall be 3 (three) arbitrators (“Arbitrators”),
                all of whom shall be fluent in English. Within thirty 30
                (thirty) Days of the reference of the dispute to arbitration,
                the Party raising the dispute and making the reference to
                arbitration shall appoint one Arbitrator and the other Party
                shall appoint the other Arbitrator. The third Arbitrator shall
                be appointed by the 2 (two) appointed Arbitrators. The arbitral
                award shall be final and binding upon the parties. The Parties
                shall equally bear the costs and expenses for the conduct of the
                arbitration proceedings, however; each Party shall bear their
                own legal expenses.
              </li>
            </ol>
            <h4>12. Amendments to the Terms of Use</h4>
            <ol>
              <li>
                We reserve the right to amend the Terms of Use from time to
                time. Any amendment that is made will come into effect from the
                moment it is displayed on the Website. The updated version of
                the Terms of Use shall supersede any of the previous versions of
                the Terms of Use.
              </li>
              <li>
                We shall make reasonable efforts to notify the members of such
                changes, however, it shall be your responsibility to be updated
                with the Terms of Use at all times.
              </li>
              <li>
                The continued use of the Website shall amount to your acceptance
                to the Terms of Use of the Website.
              </li>
            </ol>
            <h4>13. What is Power of Attorney (POA)?</h4>
            <ol>
              <li>
                Power of Attorney Act 1882, power of attorney includes any
                instrument empowering a specified person to act for and in the
                name of the person executing it.
              </li>
              <li>
                POA is very well known as Power of Attorney or Power of
                Authority which is the authority to act for another person in
                specified or all legal or financial matters. The one who gives
                an authority to some trustable person is known as a principal or
                a donor. There are various situations in one's life where an
                individual possessing properties, bank accounts, etc. may not be
                in a position to perform his duties due to reasons like being
                abroad, physically ill, old in age etc. In such situations, if
                the transaction requires the presence of the individual who is
                not able to be present personally, then the only way out is to
                give the powers to act on behalf of the individual to another
                person. This is when a Power of Attorney deed is to be created.
              </li>
            </ol>
            <h4>14. Disclaimer</h4>
            <ol>
              <li>
                Any transaction in securities that companies may offer or
                conclude with any other member of the Website shall be offered,
                issued, allotted or transferred in strict compliance of all
                applicable laws including but not limited to private placement
                rules under applicable securities laws.
              </li>
              <li>
                Nothing on this website is intended to constitute (i) an offer,
                or solicitation of an offer, to purchase or sell any security,
                other asset or service, (ii) investment advice or an offer to
                provide such advice, or (iii) a basis for making any investment
                decision. Except as expressly stated by RCPL's entity in
                writing, neither this website nor any of the materials make any
                effort to present a comprehensive or balanced description of
                RCPL or its investment activities.
              </li>
            </ol>
            <h4>15. Miscellaneous</h4>
            <ol>
              <li>
                No partnership or agency The Terms of Use shall not be construed
                so as to create a partnership or joint venture between you and
                us. Nothing in the Terms of Use shall be construed so as to
                constitute you and us as agents of one another.
              </li>
              <li>
                Specific Performance Each one of us agrees that damages may not
                be an adequate remedy and that either of us shall be entitled to
                an injunction, restraining order, right for recovery, suit for
                specific performance or such other equitable relief as a court
                of competent jurisdiction may deem necessary or appropriate to
                restrain the other, from committing any violation or enforce the
                performance of the covenants, representations and obligations
                contained in the Terms of Use. These injunctive remedies are
                cumulative and are in addition to any other rights and remedies
                the Parties may have at law or in equity, including without
                limitation a right for damages.
              </li>
              <li>
                Severability Each and every obligation under the Terms of Use
                shall be treated as a separate obligation and shall be severally
                enforceable as such in the event of any obligation or
                obligations being or becoming unenforceable in whole or in part.
                To the extent that any provision or provisions of the Terms of
                Use are unenforceable, both of us shall endeavor to amend such
                clauses as may be necessary to make the provision or provisions
                valid and effective. Notwithstanding the foregoing, any
                provision which cannot be amended as may be necessary to make it
                valid and effective shall be deemed to be deleted from the Terms
                of Use and any such deletion shall not affect the enforceability
                of the remainder of the Terms of Use not so deleted provided the
                fundamental terms of the Terms of Use are not altered.
              </li>
              <li>
                Non-Exclusive Remedies The rights and remedies herein provided
                are cumulative and none is exclusive of any other, or of any
                rights or remedies that any of us may otherwise have at law or
                in equity. The rights and remedies of any of us based upon,
                arising out of or otherwise in respect of any inaccuracy or
                breach of any representation, warranty, covenant or agreement or
                failure to fulfill any condition shall in no way be limited by
                the fact that the act, omission, occurrence or another state of
                facts upon which any claim of any such inaccuracy or breach is
                based may also be the subject matter of any other
                representation, warranty, covenant or agreement as to which
                there is no inaccuracy or breach.
              </li>
              <li>
                Partial Invalidity If any provision of the Terms of Use or the
                application thereof to any person or circumstance shall be
                invalid or unenforceable to any extent for any reason including
                by reason of any law or regulation or government policy, the
                remainder of the Terms of Use and the application of such
                provision to persons or circumstances other than those as to
                which it is held invalid or unenforceable shall not be affected
                thereby, and each provision of the Terms of Use shall be valid
                and enforceable to the fullest extent permitted by law.Any
                invalid or unenforceable provision of the Terms of Use shall be
                replaced with a provision, which is valid and enforceable and
                most nearly reflects the original intent of the invalid and
                unenforceable provision.
              </li>
              <li>
                Rights of Third Parties Nothing expressed or implied in the
                Terms of Use is intended or shall be construed to confer upon or
                give any person, other than us hereto any rights or remedies
                under or by reason of the Terms and Conditions or any
                transaction contemplated by the Terms of Use.
              </li>
              <li>
                Time of Essence Time shall be of the essence of all the matters
                arising out of or in connection with the Terms of Use.
              </li>
              <li>
                Execution The Terms of Use shall be deemed duly executed and
                shall become effective and binding upon you and us when you
                access the Website.
              </li>
            </ol>
          </div>
        </div>
      </section>
    </>
  );
}
