// import theme style scss file
import 'styles/theme.scss';
import { Poppins } from "next/font/google";
const poppins = Poppins({
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    style: ["normal", "italic"],
    subsets: ["latin"],
    display: "swap",
 });
export const metadata = {
    title: "Dashboard",
    description:
       "Find best rishtay in Islamabad, Rawalpindi, Lahore, Karachi, Hyderabad, Multan or any city of Pakistan. Also, have the best abroad/foreign rishtay.",
    keywords:
       "pakistan matrimony, matrimonial, shadi.pk, shadi pk, shaadee.pk, shaadee pk, shadi.com, shaadi.com, marrymax, getrishta, get rishta, marriage bureau, match maker, matchmaking, ideal rishta, rishtey, rishta pk, rishtey pkshadi pk register, sign up, matrimony register, shaadee.pk register, pakistani matrimony sign up, shadi.pk, shadi pk, shaadee.pk, shaadee pk, shadi.com, shaadi.com, marrymax",
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={`${poppins.className} bg-light`} >
                {children}
            </body>
        </html>
    )
}
