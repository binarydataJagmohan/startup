import React, { useEffect, useState } from 'react'
import { fetchTermsAndConditionsdata } from '@/lib/frontendapi';
import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';
import Link from 'next/link';
const QuillNoSSRWrapper = dynamic(import('react-quill'), {
    ssr: false,
    loading: () => <p>Loading...</p>,
});
export default function TermCondition() {
    const [termdata, setTermData] = useState('');
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
                    <div className="all-type-of-text">
                        <h1>1. Ownership</h1>
                        <p>
                            Lorem ipsum, dolor sit amet{" "}
                            <strong>consectetur adipisicing elit</strong>. Illum, illo.
                            Incidunt possimus eos est quod voluptatem exercitationem itaque,
                            libero magnam reiciendis, voluptas id provident modi debitis
                            accusantium impedit eligendi ea totam quidem praesentium sit porro
                            pariatur quas. Officia commodi est, cum veritatis incidunt
                            suscipit totam? Magni doloribus repellat ea asperiores.
                        </p>
                        <p>
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Pariatur
                            quo debitis molestias necessitatibus tempora modi vitae officiis
                            et eius provident, reprehenderit eaque illum corporis quaerat
                            saepe quisquam dolorem expedita quasi, veritatis voluptatem,
                            libero ullam! Eaque ex nihil magnam sapiente sed tenetur enim
                            tempore consequatur excepturi ipsum nesciunt, consectetur magni
                            eligendi iusto, velit laboriosam quasi corporis molestias
                            molestiae. Nisi explicabo quasi pariatur, tenetur obcaecati,
                            voluptas at ea <strong>asperiores sed magni possimus?</strong>
                        </p>
                        <h1>2. Acceptance of Terms</h1>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste
                            molestiae, quos nam repudiandae dolores itaque ab amet est, minima
                            mollitia perferendis ex optio voluptates! Consequatur, iusto?
                            Minima aut consectetur, ullam ad voluptatum earum error beatae
                            labore nisi aliquid tempore similique sunt aspernatur dolorum
                            culpa corporis molestiae possimus? Iusto ad nihil ipsam incidunt
                            hic, architecto excepturi atque quaerat dicta, quos corporis
                            fugiat. Deserunt soluta nihil quo veniam aut ab accusantium,
                            molestiae tempora, nesciunt enim reiciendis dolorem ex natus
                            cupiditate culpa mollitia, aliquid laborum blanditiis eius
                            numquam. Minima qui vitae quis sint quod fuga ratione, voluptate
                            quidem neque maxime facilis officiis fugiat.
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias
                            tempore vitae ratione. Possimus dolor perspiciatis dolorem nam
                            delectus, reprehenderit temporibus. Nisi optio voluptatum, nulla
                            officia veniam deserunt accusamus fuga tempore asperiores! Quis
                            vitae explicabo est at rerum tenetur ipsam eligendi, fugiat
                            aspernatur modi veritatis atque alias nam error quae assumenda
                            voluptate tempora quas suscipit. Nostrum amet impedit quasi
                            accusantium sint rem iure quos officia cumque earum quo fugit quas
                            sapiente esse odit beatae provident nesciunt, nulla, labore
                            adipisci perspiciatis soluta explicabo quis. Id sunt iste
                            obcaecati quam quaerat. Eaque fuga, fugiat nam error id minima
                            sapiente atque perferendis asperiores nobis debitis provident
                            eveniet dicta ut labore repudiandae eligendi cum reprehenderit.
                            Harum voluptate eum quis distinctio libero praesentium ullam fuga
                            enim.
                        </p>
                        <h1>3. Service Description</h1>
                        <p>
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ab iure
                            facilis, nihil quidem perferendis reprehenderit inventore ullam
                            non recusandae ipsum distinctio suscipit dignissimos labore, ex,
                            ea necessitatibus commodi officia fugiat.
                        </p>
                        <p>
                            Lorem ipsum <strong>dolor</strong> sit amet, consectetur
                            adipisicing elit. <strong>Distinctio</strong>, placeat!
                        </p>
                        <h1>4. Registering for an account</h1>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui
                            veniam libero nesciunt doloribus accusantium debitis sunt
                            incidunt, fugiat ipsa! Maiores repellendus ratione veniam libero a
                            velit earum in, quas ad amet architecto consequuntur! Neque ipsam
                            consequatur repellendus ex, quaerat earum.
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda
                            quas culpa cupiditate obcaecati nam neque laboriosam. Eligendi
                            eveniet tempore ad. Maxime eos iusto fuga itaque nostrum qui
                            doloremque tempore veritatis et provident necessitatibus vitae,
                            modi ipsum nulla sint voluptatum nesciunt reiciendis dolorum
                            corrupti ullam quam! Laboriosam debitis ab distinctio porro. Nobis
                            laudantium perspiciatis delectus quasi nulla quia nemo esse,
                            suscipit nam tenetur facilis distinctio officia, maxime obcaecati
                            repellat doloribus voluptatibus!
                        </p>
                        <h1>5. Security</h1>
                        <p>
                            {" "}
                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Consequuntur dicta eius quaerat quas corrupti eum deleniti
                            temporibus magnam, aperiam, voluptatem minus ratione cupiditate
                            nesciunt architecto et magni, ea impedit. Eaque.
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                            Obcaecati neque impedit illo laudantium molestias molestiae minus,
                            tenetur officiis harum. Deserunt in repudiandae delectus et
                            commodi, quod perferendis neque, saepe cupiditate error hic earum,
                            libero ipsum. Consectetur nemo hic assumenda porro maxime
                            necessitatibus officiis, pariatur quas doloribus veritatis nihil
                            mollitia, libero, iure facilis. At itaque ex sed quaerat iste
                            illum porro!
                        </p>
                        <h1>6. Changes to This Terms of Service</h1>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci
                            sequi eligendi laboriosam nulla voluptates possimus beatae vel
                            doloribus quidem odit perspiciatis quo mollitia recusandae
                            suscipit alias maxime, laudantium maiores optio qui consequatur
                            natus! Amet eaque beatae vitae laboriosam consequuntur, temporibus
                            quos ipsa! Nesciunt consequatur deserunt, mollitia odio atque nisi
                            quae dolor quasi voluptatum dolorem ipsa error eum dolores ab
                            repellat tempore vitae iure unde optio autem? Exercitationem, qui
                            est officiis nostrum, tempora nobis cum nemo libero laborum, natus
                            doloremque velit!
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi
                            consectetur libero perspiciatis sapiente nostrum aut corporis
                            autem inventore tenetur ipsam?
                        </p>
                        <h1>7.Method of Payment</h1>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo
                            voluptate, aut sint rem sapiente eligendi dolores, a repellat nam
                            repudiandae placeat perferendis voluptatum recusandae, facere
                            iusto molestias odit quasi dolor!
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Cupiditate impedit voluptas quod accusamus repellendus at labore
                            quos, reiciendis incidunt quas ut harum illo neque, nemo enim
                            voluptatum facere necessitatibus. Eum modi dolor sit harum ea illo
                            dignissimos maiores deserunt quaerat voluptatum voluptatibus vero,
                            asperiores sequi earum, debitis beatae quasi facilis sapiente
                            magnam itaque veritatis laboriosam nemo nulla! Dolores vel saepe
                            veritatis deserunt? Mollitia hic eos laudantium, labore facilis
                            doloribus perspiciatis dignissimos beatae! Repudiandae earum
                            voluptatibus aspernatur error sunt nemo cum qui nisi excepturi
                            eum, reiciendis quasi, minus atque ipsum aperiam ipsam sapiente
                            fuga? Doloremque numquam veniam porro eos? Quaerat, placeat
                            provident amet repellat saepe consequatur suscipit id a! Ea quis
                            minus, nobis culpa maxime explicabo nihil animi quibusdam saepe
                            corrupti molestiae facere placeat laudantium nemo. Tempore
                            doloribus nemo ex quos ab maxime magni tenetur distinctio possimus
                            dolor quasi iusto qui odio consequatur sit, laudantium excepturi
                            accusantium ducimus nam voluptatum nulla ipsam mollitia? Sapiente
                            natus minima qui nulla, eveniet quasi, eum odit inventore non modi
                            explicabo, veniam enim aperiam mollitia nesciunt nobis cupiditate
                            dolores voluptatibus itaque voluptates voluptas distinctio
                            pariatur. Corporis laudantium quasi voluptatibus obcaecati
                            molestiae beatae, odit ad aut sunt velit temporibus, modi
                            repellendus! Soluta libero voluptate sequi doloremque voluptatem?
                        </p>
                    </div>
                </div>
            </section>
        </>
    )
}
