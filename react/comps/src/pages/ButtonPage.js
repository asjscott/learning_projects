import Button from "../components/Button";
import { GoBell, GoCloud, GoDatabase } from 'react-icons/go'

function ButtonPage() {

    return <div>
        <div>
            <Button success rounded outline className='mb-5'>
                <GoBell />
                Click Me
            </Button>
        </div>
        <div>
            <Button danger outline>
                <GoCloud />
                Buy Now
            </Button>
        </div>
        <div>
            <Button warning>
                <GoDatabase />
                See Deal
            </Button>
        </div>
        <div>
            <Button secondary outline>Hide Ads</Button>
        </div>
        <div>
            <Button secondary rounded>Something</Button>
        </div>
    </div>
}

export default ButtonPage;