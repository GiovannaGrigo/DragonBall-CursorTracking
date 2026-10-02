import {
  Component,
  OnDestroy,
  OnInit,
  computed,
  output,
  signal,
} from "@angular/core";

@Component({
  selector: "app-shenlong-summon",
  standalone: true,
  templateUrl: "./shenlong-summon.component.html",
  styleUrl: "./shenlong-summon.component.scss",
})
export class ShenlongSummonComponent implements OnInit, OnDestroy {
  readonly closed = output<void>();

  readonly fullMessage = "Diga qual é o seu desejo... Eu posso realizar qualquer um, seja qual for.";

  readonly displayedMessage = signal("");
  readonly isTalking = signal(false);
  readonly isMouthOpen = signal(false);
  readonly dialogueFinished = signal(false);

  readonly shenlongImage = computed(() =>
    this.isMouthOpen()
      ? "assets/images/shenlong/shenlong-open.png"
      : "assets/images/shenlong/shenlong-closed.png",
  );

  private typingTimer?: ReturnType<typeof setInterval>;
  private mouthTimer?: ReturnType<typeof setInterval>;

  ngOnInit(): void {
    this.startDialogue(this.fullMessage);
  }

  ngOnDestroy(): void {
    this.clearTimers();
  }

  private startDialogue(message: string): void {
    this.clearTimers();

    this.displayedMessage.set("");
    this.dialogueFinished.set(false);
    this.isTalking.set(true);

    let index = 0;

    this.startMouthAnimation();

    this.typingTimer = setInterval(() => {
      if (index >= message.length) {
        this.finishDialogue();
        return;
      }

      this.displayedMessage.update((current) => current + message[index]);

      index++;
    }, 45);
  }

  private startMouthAnimation(): void {
    this.isMouthOpen.set(true);

    this.mouthTimer = setInterval(() => {
      this.isMouthOpen.update((value) => !value);
    }, 130);
  }

  private finishDialogue(): void {
    if (this.typingTimer) {
      clearInterval(this.typingTimer);
      this.typingTimer = undefined;
    }

    if (this.mouthTimer) {
      clearInterval(this.mouthTimer);
      this.mouthTimer = undefined;
    }

    this.isTalking.set(false);

    this.isMouthOpen.set(false);

    this.dialogueFinished.set(true);
  }

  skipDialogue(): void {
    if (!this.isTalking()) {
      return;
    }

    this.displayedMessage.set(this.fullMessage);

    this.finishDialogue();
  }

  private clearTimers(): void {
    if (this.typingTimer) {
      clearInterval(this.typingTimer);
    }

    if (this.mouthTimer) {
      clearInterval(this.mouthTimer);
    }

    this.typingTimer = undefined;
    this.mouthTimer = undefined;

    this.isMouthOpen.set(false);
  }
}
