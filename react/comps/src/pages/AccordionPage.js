import Accordion from "../components/Accordion";

function AccordionPage() {
    const items = [
        {
            id: 'fda38',
            label: 'Can I use React on a project?',
            content: 'You can use React on any project you want. You can use React on any project you want. You can use React on any project you want. '
        },
        {
            id: 'cvio8e3',
            label: 'Can I use JavaScript on a project?',
            content: 'You can use JavaScript on any project you want You can use JavaScript on any project you want. You can use JavaScript on any project you want. '
        },
        {
            id: 'adfimx8',
            label: 'Can I use CSS on a project?',
            content: 'You can use CSS on any project you want. You can use CSS on any project you want. You can use CSSt on any project you want.'
        },
    ]

    return <Accordion items={items}/>

}

export default AccordionPage;