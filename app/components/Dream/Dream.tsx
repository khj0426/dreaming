import React from "react";
import styles from "./Dream.module.css";

export interface DreamType {
    id: string;
    category: string;
    title: string;
    contents: string;
}

export interface DreamProps {
    dictionaries: DreamType[];
    total: number;
}

const Dream = ({ id, category, title, contents }: DreamType) => {
    return (
        <div className={styles.container}>
            <p className={styles.title}>{title}</p>
            <p className={styles.content}>{contents}</p>
        </div>
    );
};

export default Dream;
