import React from 'react';
import { useRouter } from "next/router";
import Link from 'next/link';
export default function Progress() {
    const router = useRouter();
    const isFirstStep = router.pathname === '/steps/firststep';
    const isSecondStep = router.pathname === '/steps/secondstep';
    const isThirdStep = router.pathname === '/steps/thirdstep';
    const isLoginPage = router.pathname === '/login';
    return (
        <React.Fragment>
        {!isLoginPage ? (
            <div className="steps">
            <div className={`${isFirstStep ? 'step active' : 'step'}`}>
                <div>1</div>
                <div>
                {isSecondStep || isThirdStep ? (
                    <Link href="/steps/firststep">Step 1</Link>
                ) : (
                    'Step 1'
                )}
                </div>
            </div>
            <div className={`${isSecondStep ? 'step active' : 'step'}`}>
                <div>2</div>
                <div>
                {isThirdStep ? <Link href="/steps/secondstep">Step 2</Link> : 'Step 2'}
                </div>
            </div>
            <div className={`${router.pathname === '/steps/thirdstep' ? 'step active' : 'step'}`}>
                <div>3</div>
                <div>Step 3</div>
            </div>
            </div>
        ) : (
            <div></div>
        )}
        </React.Fragment>
    );
};