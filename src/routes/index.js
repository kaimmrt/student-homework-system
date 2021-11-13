import React from "react";
import { Route, Switch } from "react-router-dom";
import asyncComponent from "../util/asyncComponent";
import { useSelector } from "react-redux";

const App = ({ match }) => {
    const authUser = useSelector(({ auth }) => auth.authUser);

    if (authUser.user_type_id == 1) {
        return (
            <Switch>
                <Route path={`${match.url}sample`} component={asyncComponent(() => import('./Dashboard/Dashboard'))} />
                <Route path={`${match.url}teacher-list`} component={asyncComponent(() => import('./Teacher/TeacherList'))} />
                <Route path={`${match.url}teacher-without-list`} component={asyncComponent(() => import('./Teacher/TeacherWithoutClassList'))} />
                <Route path={`${match.url}teacher/:user_id`} component={asyncComponent(() => import('./Teacher/Teacher'))} />
                <Route path={`${match.url}student/:user_id`} component={asyncComponent(() => import('./Student/Student'))} />
                <Route path={`${match.url}student-list`} component={asyncComponent(() => import('./Student/StudentList'))} />
                <Route path={`${match.url}student-without-list`} component={asyncComponent(() => import('./Student/StudentWithoutClassList'))} />
                <Route path={`${match.url}my-students/:user_id`} component={asyncComponent(() => import('./Student/MyStudentsList'))} />
                <Route path={`${match.url}addclass`} component={asyncComponent(() => import('./Class/AddClass'))} />
                <Route path={`${match.url}classlist`} component={asyncComponent(() => import('./Class/ClassList'))} />
                <Route path={`${match.url}class/:class_id`} component={asyncComponent(() => import('./Class/Class'))} />
                <Route path={`${match.url}homework/:homework_id`} component={asyncComponent(() => import('./Homework/UploadHomework'))} />

            </Switch>
        )
    } else if (authUser.user_type_id == 2) {
        return (
            <Switch>
                <Route path={`${match.url}sample`} component={asyncComponent(() => import('./Dashboard/Dashboard'))} />
                <Route path={`${match.url}my-students/:class_id`} component={asyncComponent(() => import('./Student/MyStudentsList'))} />
                <Route path={`${match.url}student/:user_id`} component={asyncComponent(() => import('./Student/Student'))} />
                <Route path={`${match.url}homework/:homework_id`} component={asyncComponent(() => import('./Homework/UploadHomework'))} />
                <Route path={`${match.url}give-homework`} component={asyncComponent(() => import('./Homework/GiveHomework'))} />
                <Route path={`${match.url}previous-homework`} component={asyncComponent(() => import('./Homework/PreviousHomework'))} />
            </Switch>
        )
    } else {
        return (
            <Switch>
                <Route path={`${match.url}sample`} component={asyncComponent(() => import('./Dashboard/Dashboard'))} />
                <Route path={`${match.url}my-homeworks`} component={asyncComponent(() => import('./Homework/MyHomeworks'))} />
                <Route path={`${match.url}upload-homework/:homework_id`} component={asyncComponent(() => import('./Homework/UploadHomework'))} />
            </Switch>
        )
    }
};

export default App;
