interface GoalIdPageProp {
    goalId: string,
}

export default function GoalIdPage(prop: GoalIdPageProp) {

    return <div>
        <h1>Goal page</h1>
        <p>Id: {prop.goalId}</p>
    </div>
}
