"use client"
import Image from "next/image";
import styles from "./page.module.css";
import { Button } from "../../components/Button/Button";
import { Input } from "../../components/Input/Input";
import { SubText } from "../../components/SubText/SubText";
import { TextArea } from "../../components/TextArea/TextArea";

import { SupportChat } from "./components/SupportChat/SupportChat";
import { Header } from "../../components/Header/Header";



export default function Home() {


  return (
    <main className={ styles.main }>
      <SupportChat />

      <TextArea error="e" placeholder="Введите сообщение..." onChange={ e => console.log(e) } />

      <Input placeholder="Введите сообщение..."></Input>
      <Header size="1">Текст</Header>
      <Header size="2">asdfsfd</Header>
      <Header size="3">asdfsfd</Header>

      <SubText size="1">Текст</SubText>
      <SubText size="2">Текст</SubText>
      <textarea name="" id=""></textarea>

      <Button size={ "small" } design={ "filled" } icon={ "/Union.svg" } >Button</Button>
      <Button size={ "medium" } design={ "filled" } icon={ "/Union.svg" } >Button</Button>
      <Button size={ "large" } design={ "filled" } icon={ "/Union.svg" } >Button</Button>
      <Button size={ "small" } design={ "filled" } icon={ "/Union.svg" } ></Button>
      <Button size={ "medium" } design={ "filled" } icon={ "/Union.svg" } ></Button>
      <Button size={ "large" } design={ "filled" } icon={ "/Union.svg" } ></Button>

    </main>
  );
}
