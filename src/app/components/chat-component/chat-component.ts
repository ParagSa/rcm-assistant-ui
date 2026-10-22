import { Component, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../services/chat-service';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat-component.html',
  styleUrl: './chat-component.scss',
})
export class ChatComponent implements AfterViewChecked {
  messages: Message[] = [
    {
      role: 'assistant',
      content:
        'Hi, I\'m your RCM Denial Assistant. Ask me about a denial code, appeal guidance, or ask me to draft an appeal letter.',
    },
  ];
  currentMessage = '';
  isLoading = false;

  @ViewChild('scrollAnchor') private scrollAnchor!: ElementRef;

  constructor(private chatService: ChatService) {}

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  sendMessage(): void {
    const text = this.currentMessage.trim();
    if (!text || this.isLoading) return;

    this.messages.push({ role: 'user', content: text });
    this.currentMessage = '';
    this.isLoading = true;

    this.chatService.sendMessage(text).subscribe({
      next: (res) => {
        this.messages.push({ role: 'assistant', content: res.reply });
        this.isLoading = false;
      },
      error: (err) => {
        this.messages.push({
          role: 'assistant',
          content: 'Something went wrong reaching the assistant. Is the API running on port 8000?',
        });
        this.isLoading = false;
        console.error(err);
      },
    });
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }

  private scrollToBottom(): void {
    try {
      this.scrollAnchor.nativeElement.scrollIntoView({ behavior: 'smooth' });
    } catch {
      // element not ready yet, ignore
    }
  }
}