import { Injectable } from '@angular/core';
import { Operator } from '../models/enum';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})

export class MessagesService {
  constructor(private messageService: MessageService) {}

  //Adding
  async addMessageSuccessAdding() {
    await this.messageService.add({
      key: 'msgSuccess',
      severity: 'success',
      summary: 'Success',
      detail: 'Thêm dữ liệu thành công!',
    });
  }
  async addMessageErrorAdding() {
    await this.messageService.add({
      key: 'msgError',
      severity: 'error',
      summary: 'Error',
      detail: 'Thêm dữ liệu không thành công!',
    });
  }


  // Delete
  async addMessageSuccessDelete() {
    await this.messageService.add({
      key: 'msgSuccess',
      severity: 'success',
      summary: 'Success',
      detail: 'Xóa dữ liệu thành công!',
    });
  }
  async addMessageErrorDelete() {
    await this.messageService.add({
      key: 'msgError',
      severity: 'error',
      summary: 'Error',
      detail: 'Xóa dữ liệu không thành công!',
    });
  }

  // Editing
  async addMessageSuccessEditing() {
    await this.messageService.add({
      key: 'msgSuccess',
      severity: 'success',
      summary: 'Success',
      detail: 'Cập nhật dữ liệu thành công!',
    });
  }
  async addMessageErrorEditing() {
    await this.messageService.add({
      key: 'msgError',
      severity: 'error',
      summary: 'Error',
      detail: 'Cập nhật dữ liệu không thành công!',
    });
  }
}
