import Card from 'react-bootstrap/Card'

function AboutUs() {
    return (
        <>
            <div className="row row-cols-md-2">
                <div className="col">
                    <img src="/KL.jpeg" alt="Kate and Leisha" />
                </div>
                <div className="col">
                    <Card className="background-color">
                        <Card.Body>
                            <Card.Title>
                                <h1 className="default-text-bold">
                                    KATHERINE MOENNIG
                                </h1>
                            </Card.Title>
                            is a critically acclaimed actor whose works span
                            film, television, and theatre. She was most recently
                            seen reprising her role as “Shane McCutcheon” on THE
                            L WORD: GENERATION Q, for Showtime. For the sequel
                            to the groundbreaking original series, Moennig
                            served as executive producer and star alongside
                            original cast members Jennifer Beals and Leisha
                            Hailey as well as a new generation of diverse,
                            self-possessed LGBTQIA characters experiencing love,
                            heartbreak, sex, setbacks, and success in LA. In
                            recent years Moennig was seen starring in Showtime’s
                            RAY DONOVAN alongside Liev Schreiber; as well as in
                            her portrayal of “Professor Hewson” in Freeform’s
                            breakout series GROWN-ISH. Moennig’s film credits
                            include the neo-noir legal thriller THE LINCOLN
                            LAWYER and the indie drama LANE 1974.
                        </Card.Body>
                    </Card>
                </div>
                <div className="col">
                    <Card className="background-color">
                        <Card.Body>
                            <Card.Title>
                                <h1 className="default-text-bold">
                                    LEISHA HAILEY
                                </h1>
                            </Card.Title>
                            is an American actor, director, executive producer,
                            musician, and podcaster. Hailey is best known for
                            her breakout role, “Alice Pieszecki,” in the
                            Showtime Network series THE L WORD and the reboot,
                            THE L WORD: GENERATION Q. In addition to reprising
                            her groundbreaking role, Hailey also served as EP of
                            GENERATION Q, alongside longtime cast members
                            Jennifer Beals and Kate Moennig. After joining the
                            DGA in 2023, she directed the extraordinary series
                            finale of GENERATION Q. Hailey has appeared on
                            several other television shows, including SILICON
                            VALLEY, BOSCH, and THE NEW NORMAL, and has appeared
                            in many films, including her debut 1997’s ALL OVER
                            ME. She first came to the public’s attention as a
                            musician, recording three albums for MCA/Universal
                            Records with her band, THE MURMURS. Hailey continued
                            her music career as part of the band, UH HUH HER. In
                            April 2023, Hailey spoke at the White House press
                            briefing in honor of Lesbian Visibility Week
                            alongside her castmates and the first Lesbian press
                            secretary, Karine Jean-Pierre.
                        </Card.Body>
                    </Card>
                </div>
                <div className="col">
                    <img
                        src="/KL2.jpeg"
                        height={430}
                        width={430}
                        alt="Kate and Leisha"
                    />
                </div>
            </div>
        </>
    )
}

export default AboutUs
