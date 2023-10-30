import React, { useState, useEffect } from "react";
import { fetchPrivacyPoliciesdata } from "@/lib/frontendapi";
import dynamic from "next/dynamic";

export default function RiskInvestments() {
  return (
    <>
      <section className="term-conditions py-5">
        <div className="container">
          <h2>Risk Investments</h2>
          <p>
            By accessing/using the website [https://www.risingcapitalist.com]
            (“Website”) of Rising Capitalist Private Limited (“RCPL”) dba
            RisingCapitalist, you bear the fitness to undertake the risks in
            investments through the Website including but not limited to the
            following:
          </p>
          <div className="all-type-of-text">
            <p>
              1. Loss of Capital: Investments in startups/early-stage ventures
              (“Companies”) bear an inherent risk of not assuring full-fledged
              profits or returns from the investments, since these companies may
              not have a business model or established concept which can be used
              as a reference for 100% success. It is for this reason that it is
              generally recommended to create a diversified portfolio of
              investments, which will have the potential to deliver gains and
              absorb capital losses in the aggregate.
            </p>
            <p>
              2. Lack of Liquidity: Liquidity refers to equity shares that can
              be sold with ease. However, equity investments in the Companies
              are highly illiquid as the shares of such Companies are
              unlisted/private and cannot be sold easily on an exchange or
              similar secondary trading platform.
            </p>
            <p>
              3. Rarity of Dividends: The Companies may most likely be unable to
              pay any dividend throughout the life cycle of an investment.
              Therefore, in order for you to earn a return out of any of your
              investments, you will have to go through a further sale or such
              other similar process for which a time frame cannot be
              ascertained.
            </p>
            <p>
              4. Dilution: The Companies may raise additional capital in the
              future and therefore, your shareholding may be diluted, as a
              result of such issue of new shares.
            </p>
            <p>
              5. Performance: The Company’s forward-looking statements,
              containing opinions and beliefs, are based on a number of
              estimates and assumptions that are subject to significant
              business, economic, regulatory, and competitive uncertainties.
              Though these statements can be used for understanding the
              objectives and goals of the Companies, such statements should not
              be considered as undertakings from the Companies and should be
              considered as merely being speculative and having subjective
              nature.
            </p>
            <p>
              6. Tax: You may be liable to pay taxes on any dividends or gains
              you receive from your investments in the Company and payment of
              such taxes is entirely your responsibility. Therefore, you should
              consult your tax advisor for more information on these matters.
            </p>
          </div>
          <p>
            For the avoidance of doubt, in light of your acknowledgment of the
            above risk factors, you agree and acknowledge that you shall hold
            RCPL harmless and shall not raise any claim in respect of any of the
            above.
          </p>
        </div>
      </section>
    </>
  );
}
